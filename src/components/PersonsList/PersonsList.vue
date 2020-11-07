<template>
	<v-container>
		<h1 class="text-center">Star Wars characters list</h1>
		<div class="text-center progress-bar" v-if="isLoading">
			<v-progress-circular indeterminate color="#419494"></v-progress-circular>
		</div>
		<v-row v-else>
			<v-col
				v-for="(item, index) of personsWithStarships"
				:key="index"
				lg="6"
				md="6"
				sm="6"
				cols="12"
			>
				<v-card outlined>
					<v-card-title class="justify-center title-container">{{ item.name }}</v-card-title>
					<v-card-text>
						<v-row>
							<v-col>Birth year</v-col>
							<v-col class="text-right">{{ item.birth_year || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Gender</v-col>
							<v-col class="text-right">{{ item.gender || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Starships</v-col>
							<v-col>
								<v-row
									v-if="item.starships.length"
									class="flex-column starship-container"
									justify="center"
									align="end"
								>
									<v-badge
										v-for="(starship, starshipIndex) of item.starships"
										:key="starshipIndex"
										:content="starship"
										inline
										color="#008cff"
										class="starship"
									/>
								</v-row>
								<v-row class="flex-column" justify="center" align="end" v-else>
									<v-badge inline content="No starships" color="red" />
								</v-row>
							</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions class="justify-center">
						<router-link
							class="back-btn"
							:to="{ name: 'person', params: { id: getPersonId(index) } }"
						>
							<v-btn dark color="#419494">See more info</v-btn>
						</router-link>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<div class="text-center" v-if="personsWithStarships.length && !isLoading">
			<v-pagination
				v-model="page"
				:length="peopleCount"
				color="#419494"
				@input="onPaginationChange"
			/>
		</div>
		<v-alert type="error" v-if="error" class="error"
			>An error occurred while receiving data</v-alert
		>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { Person } from "@/interfaces";

import { namespace } from "./store";

@Component({
	computed: {
		...mapState(namespace, ["persons", "peopleCount", "isLoading", "error"]),
		...mapGetters(namespace, ["personsWithStarships"]),
	},
	methods: {
		...mapActions(namespace, ["loadPersons"]),
		...mapMutations(namespace, ["setIsLoading"]),
	},
})
export default class PersonsList extends Vue {
	persons!: Person[];

	peopleCount!: boolean;

	page = 1;

	isLoading!: boolean;

	error!: boolean;

	personsWithStarships!: Person[];

	loadPersons!: Function;

	setIsLoading!: Function;

	getPage() {
		return Number(this.$route.query?.page) || 1;
	}

	getPersonId(index: number) {
		const page = this.getPage();
		return this.page === 1 ? index + 1 : (page - 1) * 10 + (index + 1);
	}

	onPaginationChange(pageNumber: number): void {
		this.$router.push({ name: "home", query: { page: String(pageNumber) } });
		this.loadPersons(pageNumber);
	}

	created() {
		this.page = this.getPage();
		this.loadPersons(this.page);
	}
}
</script>
