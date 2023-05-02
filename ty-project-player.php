<?php

/**
 * Plugin Name:       TY Project Player 1
 * Plugin URI:        https://plugin-url.net
 * Description:       Gutenberg Editor Block for TY Project
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Afterlogic
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ty-project-player
 * Domain Path:       typp
 *
 * @package           typroject
 */

if (!defined('ABSPATH')) {
  die;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function typroject_ty_project_player_block_init()
{
  register_block_type(__DIR__ . '/build');
}
add_action('init', 'typroject_ty_project_player_block_init');


function add_main_typp_script()
{
  wp_enqueue_script('main_typp_script', 'https://ty.mailstone.net/widget/player.js');
}
add_action('wp_enqueue_scripts', 'add_main_typp_script');
add_action('admin_enqueue_scripts', 'add_main_typp_script');

add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'apd_settings_link');
function apd_settings_link(array $links)
{
  $url = get_admin_url() . "options-general.php?page=typp";
  $settings_link = '<a href="' . $url . '">' . __('Settings', 'textdomain') . '</a>';
  $links[] = $settings_link;
  return $links;
}

function add_settings_page()
{
  add_submenu_page(
    'options-general.php',
    'TY Project Player Settings',
    'TY Project Player',
    'manage_options',
    'typp',
    'show_settings_form'
  );
}
add_action('admin_menu', 'add_settings_page', 25);


function add_settings()
{
  $typp_user_email = 'typp_user_email';
  $typp_user_password = 'typp_user_password';

  register_setting('typp_settings', $typp_user_email);
  register_setting('typp_settings', $typp_user_password);
  register_setting('typp_settings', 'typp_token', array('show_in_rest' => true));
  register_setting('typp_settings', 'typp_refresh_token');
  // register_setting('typp_settings', 'typp_players', array(
  //   'type' => 'array',
  //   'show_in_rest' => array(
  //     'schema' => array(
  //       'items' => array(
  //         // 'type' => 'object',
  //         'value'    => 'string',
  //         'label' => 'string',
  //       ),
  //     ),
  //   ),
  // ));

  add_settings_section('typp_settings_section', 'Use your credentials to log in to the TY Project', '', 'typp');

  add_settings_field(
    $typp_user_email,
    'Email',
    'add_email_field',
    'typp',
    'typp_settings_section',
    array(
      'label_for' => $typp_user_email,
      'name' => $typp_user_email,
    )
  );
  add_settings_field(
    $typp_user_password,
    'Password',
    'add_password_field',
    'typp',
    'typp_settings_section',
    array(
      'label_for' => $typp_user_password,
      'name' => $typp_user_password,
    )
  );
}
add_action('admin_init', 'add_settings');

function add_email_field($args)
{
  $value = get_option($args['name']);
  printf(
    '<input type="text" id="%s" name="%s" value="%s" />',
    esc_attr($args['name']),
    esc_attr($args['name']),
    strval($value)
  );
}
function add_password_field($args)
{
  $value = get_option($args['name']);
  printf(
    '<input type="password" id="%s" name="%s" value="%s" />',
    esc_attr($args['name']),
    esc_attr($args['name']),
    strval($value)
  );
}


function show_settings_form()
{

  // echo get_option('typp_token');
  // echo '<br>';
  // echo get_option('typp_refresh_token');
  // echo '<br>';
  // echo '<pre>';
  // print_r(get_option('typp_players'));
  // echo '</pre>';

  if (get_option('typp_user_email') && get_option('typp_user_password')) {
    typp_auth(get_option('typp_user_email'), get_option('typp_user_password'));
  }

  echo '<div class="wrap">
			<h1>' . get_admin_page_title() . '</h1>
			<form method="post" action="options.php">';
  settings_fields('typp_settings');
  do_settings_sections('typp');
  submit_button();
  echo '</form></div>';

  if (isset($_POST['typp_user_email']) && isset($_POST['typp_user_password'])) {
    typp_auth($_POST['typp_user_email'], $_POST['typp_user_password']);
  }
}

function typp_auth($email, $password)
{
  $url = 'https://ty.mailstone.net/api/auth/login';
  $response = wp_remote_post($url, array(
    'headers' => array('Content-Type: application/x-www-form-urlencoded'),
    'body'    => array('email' =>  $email, 'password' => $password),
  ));

  if ($response['response']['code'] == '200') {
    update_option('typp_token', wp_remote_retrieve_headers($response)['access-token']);
    update_option('typp_refresh_token', wp_remote_retrieve_headers($response)['refresh-token']);
    echo '<div class="notice notice-success is-dismissible"><p>You are authorized</p></div>';
    // fetch_players();
  } else {
    $responceData = (!is_wp_error($response)) ? json_decode(wp_remote_retrieve_body($response), true) : null;
    echo '<div class="notice notice-error is-dismissible"><p>' . $responceData['message'] . '</p>
    <p>You can change your password on <a href="https://ty.mailstone.net/" target="_blank">TY Project Page</a></p></div>';
  }

  // echo '<br><b>wp_remote_retrieve_body: </b><br><pre>';
  // print_r(json_decode(wp_remote_retrieve_body($response)));
  // echo '</pre>';
  // $bodyVars = get_object_vars(json_decode(wp_remote_retrieve_body($response)));
  // echo 'USER ID : ' . $bodyVars['id'] . '<br>';

  // echo '<br><b>wp_remote_retrieve_headers: </b><br><pre>';
  // print_r(wp_remote_retrieve_headers($response));
  // echo wp_remote_retrieve_headers($response)['access-token'];
  // echo '<br>';
  // echo wp_remote_retrieve_headers($response)['refresh-token'];
  // echo '</pre>';

  // echo '<br><b>wp_remote_retrieve_response_code: </b>';
  // print_r(json_decode(wp_remote_retrieve_response_code($response)));

  // echo '<br><b>wp_remote_retrieve_response_message: </b>';
  // print_r(wp_remote_retrieve_response_message($response));

}


// function fetch_players()
// {
//   $players = wp_remote_get('https://ty.mailstone.net/api/players', array(
//     'headers' => array('Authorization' => get_option('typp_token')),
//   ));
//   $players = json_decode(wp_remote_retrieve_body($players, true));
//   $playersFiltered = [];
//   foreach ($players as $item) {
//     $playersFiltered[] = ["value" => $item->id, "label" => $item->name, "playerType" => $item->type];
//   }
//   update_option('typp_players', $playersFiltered);
//   // echo '<pre>';
//   // print_r(get_option('typp_players'));
//   // echo '</pre>';
// }
