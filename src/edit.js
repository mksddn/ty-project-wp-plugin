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
import { useSelect } from "@wordpress/data";
import { store as coreStore, useEntityProp } from "@wordpress/core-data";

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
	const [typp_token] = useEntityProp("root", "site", "typp_token");
	const { playerID } = attributes;
	let allPlayers = [];
	let staticPlayers = [];
	let dynamicPlayers = [];
	let playersOptions = [];

	fetch("https://ty.mailstone.net/api/players", {
		method: "GET",
		status: "active",
		headers: {
			Authorization: typp_token,
		},
	})
		.then((response) => {
			// console.log(response.ok);
			return response.json();
		})
		.then((data) => {
			allPlayers = data;
		})
		.catch(function (err) {
			renderErrorMessage(err);
		})
		.finally(function () {
			console.log("fetch finished");
			staticPlayers = allPlayers.filter((player) => player.type == "static");
			dynamicPlayers = allPlayers.filter((player) => player.type == "dynamic");
			playersOptions = allPlayers.map((player) => ({
				label: player.name,
				value: player.id,
			}));
			console.log(allPlayers);
			console.log(playersOptions);
			console.log(staticPlayers);
			console.log(dynamicPlayers);
		});

	playersOptions = [
		{
			label: "player name 1",
			value: "player id 1",
		},
		{
			label: "player name 2",
			value: "player id 2",
		},
	];

	return (
		<div {...useBlockProps()}>
			<InspectorControls key="settings">
				<PanelBody>
					<SelectControl
						label="Select a Player"
						value={playerID}
						options={playersOptions}
						onChange={(value) => setAttributes({ playerID: value })}
					/>
				</PanelBody>
			</InspectorControls>
			{__("TY Project Player – hello from the editor!", "ty-project-player")}
			<br />
			<span>
				Player ID: <b>{attributes.playerID}</b>
			</span>
		</div>
	);
}
