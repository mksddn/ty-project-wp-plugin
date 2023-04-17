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
import { store as coreStore, useEntityProp } from "@wordpress/core-data";
import { useEffect, useState } from "@wordpress/element";

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

	const [playersOptions, setPlayersOptions] = useState([]);

	const getPlayers = () => {
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
				setPlayersOptions(
					data
						.filter((player) => player.status == "active")
						.map((player) => ({
							label: player.name,
							value: player.id,
							type: player.type,
						}))
				);
			})
			.catch((err) => {
				// renderErrorMessage(err);
			})
			.finally((data) => {
				// console.log("fetch finished");
				// setPlayersOptions(
				//   data.map((player) => ({
				//     label: player.name,
				//     value: player.id,
				//   }))
				// );
			});
	};

	useEffect(() => {
		getPlayers();
	}, []);

	const titleOption = [{ value: "", label: "Select a Player" }];

	return (
		<div {...useBlockProps()}>
			<InspectorControls key="settings">
				<PanelBody>
					{!playersOptions && "Loading"}
					{playersOptions && playersOptions.length === 0 && (
						<p>
							<b>You're not authorized!</b>
						</p>
					)}
					{playersOptions && playersOptions.length > 0 && (
						<p>You're authorized!</p>
					)}
					<SelectControl
						label="Select a Static Player"
						value={playerID}
						options={titleOption.concat(
							playersOptions.filter((player) => player.type == "static")
						)}
						onChange={(value) => setAttributes({ playerID: value })}
					/>
					<SelectControl
						label="Select a Dynamic Player"
						value={playerID}
						options={titleOption.concat(
							playersOptions.filter((player) => player.type == "dynamic")
						)}
						onChange={(value) => setAttributes({ playerID: value })}
					/>
				</PanelBody>
			</InspectorControls>
			{__("TY Project Player – hello from the editor!", "ty-project-player")}
			<br />
			<span onClick={getPlayers}>
				Player ID: <b>{attributes.playerID}</b>
			</span>
			<script
				type="text/javascript"
				src="https://ty.mailstone.net/widget/player.js"
			></script>
			<script defer>Widget.init("{playerID}")</script>
		</div>
	);
}
