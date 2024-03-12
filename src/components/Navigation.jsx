import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./Root";

export default class Navigation extends Component {
	render() {
		return (
			<NavigationContainer>
				<Root />
			</NavigationContainer>
		);
	}
}
