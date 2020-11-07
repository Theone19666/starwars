import axios, { AxiosResponse } from "axios";
import { Person, BaseState, IObject } from "@/interfaces";
import BASE_URL from "@/config";
import setStarships from "./utils";

export const namespace = "persons";

interface State {
	persons: Person[];
	peopleCount: number;
	isLoading: boolean;
	error: boolean;
}

interface Getters {
	personsWithStarships(state: State, _getters: Getters, rootState: BaseState): Person[];
}

export default {
	namespaced: true,
	state: {
		persons: [] as Person[],
		peopleCount: 0,
		isLoading: true,
		error: false,
	},
	getters: {
		personsWithStarships: (state: State, _getters: Getters, rootState: BaseState) => {
			return setStarships(state.persons, rootState.starships);
		},
	},
	mutations: {
		loadPersons(state: State, payload: Person[]) {
			state.persons = payload;
		},
		setPeopleCount(state: State, payload: number) {
			state.peopleCount = payload;
		},
		setIsLoading(state: State, payload: boolean) {
			state.isLoading = payload;
		},
		setIsError(state: State, payload: boolean) {
			state.error = payload;
		},
	},
	actions: {
		loadPersons: async ({ commit }: IObject, page: number) => {
			commit("setIsLoading", true);
			const url = page === 1 ? `${BASE_URL}/people/` : `${BASE_URL}/people/?page=${page}`;
			axios
				.get(url)
				.then(({ data }: AxiosResponse) => {
					const { results, count } = data;
					commit("loadPersons", results);
					commit("setPeopleCount", count ? Math.ceil(count / 10) : 10);
				})
				.catch(() => {
					commit("setIsError", true);
					setTimeout(() => commit("setIsError", false), 3000);
				})
				.finally(() => commit("setIsLoading", false));
		},
	},
};
