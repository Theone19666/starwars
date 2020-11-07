import Vue from "vue";
import Vuex from "vuex";
import axios, { AxiosResponse } from "axios";
import { Starship } from "@/interfaces";
import BASE_URL from "@/config";
import persons from "@/components/PersonsList/store";
import personInfo from "@/components/PersonPage/store";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		starships: [] as Starship[],
	},
	mutations: {
		addStarship(state, payload: Starship) {
			state.starships.push(payload);
		},
	},
	actions: {
		loadStarships: async (context) => {
			const starshipsCount = 75;
			const starshipsPromises = [];
			for (let i = 1; i < starshipsCount; i++) {
				starshipsPromises.push(
					axios
						.get(`${BASE_URL}/starships/${i}/`)
						.then((starship: AxiosResponse) => {
							context.commit("addStarship", starship.data);
						})
						.catch((error) => {
							// throw new Error(error);
							console.log(error);
						})
				);
			}
			return Promise.all(starshipsPromises);
		},
	},
	modules: { persons, personInfo },
});
