import axios, { AxiosResponse } from "axios";
import { Person, BaseState, IObject } from "@/interfaces";
import BASE_URL from "@/config";
import setStarships from "./utils";

export const namespace = "personInfo";

interface State {
	personInfo: Person;
	error: boolean;
	isLoading: boolean;
	errorMessage: string;
}

interface Getters {
	personWithStarships(state: State, _getters: Getters, rootState: BaseState): Person[];
}

export default {
	namespaced: true,
	state: {
		personInfo: {} as Person,
		error: false,
		isLoading: true,
		errorMessage: "",
	},
	getters: {
		personWithStarships: (state: State, _getters: Getters, rootState: BaseState) => {
			return setStarships(state.personInfo, rootState.starships);
		},
	},
	mutations: {
		loadPersonInfo(state: State, payload: Person) {
			state.personInfo = payload;
		},
		setIsLoading(state: State, payload: boolean) {
			state.isLoading = payload;
		},
		setIsError(state: State, payload: boolean) {
			state.error = payload;
		},
		setErrorMessage(state: State, payload: string) {
			state.errorMessage = payload;
		},
	},
	actions: {
		loadPersonInfo: async ({ commit }: IObject, personId: string) => {
			commit("setErrorMessage", "");
			axios
				.get(`${BASE_URL}/people/${personId}/`)
				.then(({ data }: AxiosResponse) => {
					commit("loadPersonInfo", data);
				})
				.catch((error) => {
					if (error?.response?.status === 404) {
						commit("setErrorMessage", "There is no this character");
					} else {
						commit("setErrorMessage", "Error");
					}
					commit("setIsError", true);
					setTimeout(() => commit("setIsError", false), 3000);
				})
				.finally(() => commit("setIsLoading", false));
		},
	},
};
