<?php
global $post;
$post = get_post($post->ID);
$blocks = parse_blocks($post->post_content);
foreach ($blocks as $block) {
	if ('typroject/ty-project-player' === $block['blockName']) {
		echo '<script defer id="' . $block['attrs']['playerID'] . '">
			Widget.init("' . $block['attrs']['playerID'] . '")
			</script>';
		break;
	}
}
