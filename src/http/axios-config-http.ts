import axios from "axios";


export const twitchAxios = axios.create({
	baseURL:"https://api.twitch.tv/helix/"
});

export const twitchTokenAxios = axios.create({
	baseURL: "https://id.twitch.tv/oauth2/token"
});