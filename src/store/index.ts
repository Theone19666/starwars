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
		addStarships(state, payload: Starship[]) {
			console.log(payload);
			state.starships.push(...payload);
		},
	},
	actions: {
		loadStarships: async ({ commit }) => {
			const result: Starship[] = [];
			const starshipsPagesSize = 4;
			for (let i = 1; i <= starshipsPagesSize; i++) {
				const url = i === 1 ? `${BASE_URL}/starships/` : `${BASE_URL}/starships/?page=${i}`;
				axios
					.get(url)
					.then((resp: AxiosResponse) => {
						commit("addStarships", resp.data.results);
						result.push(resp.data.results);
					})
					.catch((error) => {
						// throw new Error(error);
						console.log(error);
					});
			}
			return result;
		},
	},
	modules: { persons, personInfo },
});
