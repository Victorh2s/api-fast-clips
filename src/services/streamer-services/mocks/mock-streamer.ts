import { Streamer } from "@prisma/client";
import moment from "moment";

export const mockStreamers: Streamer[] = [
	{
		id: "517877705",
		login: "gaulestv",
		display_name: "gaulestv",
		type: "Cs2",
		broadcaster_type: "partner",
		description:
      "Do Lock and Load ao Pentakill. De CS:GO a LOL. De transmissões exclusivas a análises detalhadas de cada partida. A GaulesTV é feita pela tribo para a tribo: um novo canal com muito mais conteúdo, campeonatos para todos, novos gauleses e o mesmo espírito que nos trouxe até aqui.",
		profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/124660fa-4f98-4759-9ec5-131eabbb8528-profile_image-300x300.png",
		offline_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/1fb89682-beed-4596-a7f3-6f52e670f1d7-channel_offline_image-1920x1080.png",
		view_count: 0,
		created_at: moment("2024-08-27T23:36:32.158Z").toDate(),
	},
	{
		id: "75891532",
		login: "michel",
		display_name: "Michel",
		type: "Cs2",
		broadcaster_type: "partner",
		description:
      "Fiz parte de equipes como mibr, g3x, oNe, KEYD, Red Reserve, GamerHouse, playArt e muitas outras. Atualmente transmitindo o conteudo lider em Counter-Strike & VALORANT. Propagando ideias e o AGGLIFESTYLE.",
		profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/50d70d17-7221-4d2d-a3f6-0c59a9d42a0f-profile_image-300x300.png",
		offline_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/814be884-1f27-494c-b3a2-e0c48f88b091-channel_offline_image-1920x1080.png",
		view_count: 0,
		created_at: moment("2024-08-27T23:37:37.460Z").toDate(),
	},
];

export const mockStreamer: Streamer = {
	id: "517877705",
	login: "gaulestv",
	display_name: "gaulestv",
	type: "Cs2",
	broadcaster_type: "partner",
	description:
    "Do Lock and Load ao Pentakill. De CS:GO a LOL. De transmissões exclusivas a análises detalhadas de cada partida. A GaulesTV é feita pela tribo para a tribo: um novo canal com muito mais conteúdo, campeonatos para todos, novos gauleses e o mesmo espírito que nos trouxe até aqui.",
	profile_image_url:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/124660fa-4f98-4759-9ec5-131eabbb8528-profile_image-300x300.png",
	offline_image_url:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/1fb89682-beed-4596-a7f3-6f52e670f1d7-channel_offline_image-1920x1080.png",
	view_count: 0,
	created_at: moment("2024-08-27T23:36:32.158Z").toDate(),
};
