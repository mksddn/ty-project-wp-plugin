/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { useEffect } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	// const [typp_token] = useEntityProp("root", "site", "typp_token");
	const [typp_players] = useEntityProp("root", "site", "typp_players");
	const { playerID } = attributes;
	const allPlayers = typp_players;
	let staticPlayers = null;
	let dynamicPlayers = null;

	if (allPlayers) {
		staticPlayers = typp_players.filter(
			(player) => player.playerType == "static"
		);
		dynamicPlayers = typp_players.filter(
			(player) => player.playerType == "dynamic"
		);
		console.log(staticPlayers);
		console.log(dynamicPlayers);
	}

	// let playersOptions = typp_players.map((player) => ({
	// 	label: player.name,
	// 	value: player.id,
	// }));

	// useEffect(() => {
	// 	fetch("https://ty.mailstone.net/api/players", {
	// 		method: "GET",
	// 		status: "active",
	// 		headers: {
	// 			Authorization: typp_token,
	// 		},
	// 	})
	// 		.then((response) => {
	// 			// console.log(response.ok);
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			allPlayers = data;
	// 		})
	// 		.catch(function (err) {
	// 			renderErrorMessage(err);
	// 		})
	// 		.finally(function () {
	// 			console.log("fetch finished");
	// 			return (playersOptions = playersOptions);
	// 		});
	// }, []);

	return (
		<div {...useBlockProps()}>
			{/* <ServerSideRender> */}
			<InspectorControls key="settings">
				<PanelBody>
					<SelectControl
						label="Select a Static Player"
						value={playerID}
						options={staticPlayers || allPlayers}
						onChange={(value) => setAttributes({ playerID: value })}
					/>
					<SelectControl
						label="Select a Dynamic Player"
						value={playerID}
						options={dynamicPlayers || allPlayers}
						onChange={(value) => setAttributes({ playerID: value })}
					/>
				</PanelBody>
			</InspectorControls>
			{/* {!playersOptions && "Loading"}
			{playersOptions && playersOptions.length === 0 && "No Players"}
			{playersOptions && playersOptions.length > 0 && ( */}
			<div>
				{__("TY Project Player – hello from the editor!", "ty-project-player")}
				<br />
				<span>
					Player ID: <b>{attributes.playerID}</b>
				</span>
			</div>
			{/* )} */}
			{/* </ServerSideRender> */}
		</div>
	);
}
