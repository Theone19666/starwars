<template>
	<v-container>
		<h1 class="text-center">Star Wars people list</h1>
		<div class="text-center progress-bar" v-if="isLoading">
			<v-progress-circular indeterminate color="#419494"></v-progress-circular>
		</div>
		<v-row v-else>
			<v-col v-for="(item, index) of people" :key="index" lg="6" md="6" sm="6" cols="12">
				<v-card outlined>
					<v-card-title class="justify-center">{{ item.name }}</v-card-title>
					<v-card-text>
						<v-row>
							<v-col>Height</v-col>
							<v-col class="text-right">{{ item.height || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Mass</v-col>
							<v-col class="text-right">{{ item.mass || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Gender</v-col>
							<v-col class="text-right">{{ item.gender || "unknown" }}</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions class="justify-center">
						<router-link
							class="back-btn"
							:to="{ name: 'person', params: { id: getPersonId(index) } }"
						>
							<v-btn color="#419494">See more info</v-btn>
						</router-link>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<div class="text-center" v-if="!isLoading">
			<v-pagination
				v-model="page"
				:length="peopleCount"
				color="#419494"
				@input="onPaginationChange"
			/>
		</div>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { PeopleRequestResult, Person } from "@/interfaces";
import BASE_URL from "@/config";

@Component
export default class PersonsList extends Vue {
	people: Person[] = [];

	peopleCount = 0;

	page = 1;

	isLoading = false;

	getPersons(page = 1): void {
		if (page < 1) return;
		this.isLoading = true;
		// prettier-ignore
		const url = page === 1 ? `${BASE_URL}/people` : `${BASE_URL}/people?page=${page}`;
		fetch(url)
			.then((result) => result.json())
			.then((result: PeopleRequestResult) => {
				this.people = result.results as Person[];
				this.peopleCount = Math.ceil(result.count / 10);
				this.page = page;
				this.isLoading = false;
			});
	}

	getPage() {
		return Number(this.$route.query?.page) || 1;
	}

	getPersonId(index: number) {
		return this.page === 1 ? index + 1 : index + 11;
	}

	onPaginationChange(pageNumber: number): void {
		this.$router.push({ name: "home", query: { page: String(pageNumber) } });
		this.getPersons(pageNumber);
	}

	created() {
		this.page = this.getPage();
		this.getPersons(this.page);
	}
}
</script>
