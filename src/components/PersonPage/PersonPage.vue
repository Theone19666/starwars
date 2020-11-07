<template>
	<v-container>
		<div class="text-center progress-bar" v-if="isLoading">
			<v-progress-circular indeterminate color="#419494"></v-progress-circular>
		</div>
		<v-row justify="center" v-else>
			<v-col lg="6" md="8" sm="8" cols="12">
				<v-card outlined>
					<v-card-title class="title-container">
						<v-row>
							<v-col cols="8">
								<h3>
									{{ !errorMessage ? personWithStarships.name : errorMessage }}
								</h3>
							</v-col>
							<v-col class="text-right">
								<v-btn dark color="#419494" class="back-btn" @click="goBack">Go back</v-btn>
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-text v-if="!errorMessage">
						<v-row>
							<v-col>Birth year</v-col>
							<v-col class="text-right">{{ personWithStarships.birth_year || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Gender</v-col>
							<v-col class="text-right">{{ personWithStarships.gender || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Height</v-col>
							<v-col class="text-right">{{ personWithStarships.height || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Mass</v-col>
							<v-col class="text-right">{{ personWithStarships.mass || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Hair color</v-col>
							<v-col class="text-right">{{ personWithStarships.hair_color || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Skin color</v-col>
							<v-col class="text-right">{{ personWithStarships.skin_color || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Eye color</v-col>
							<v-col class="text-right">{{ personWithStarships.eye_color || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Starships</v-col>
							<v-col>
								<v-row
									v-if="personWithStarships.starships && personWithStarships.starships.length"
									class="flex-column starship-container"
									justify="center"
									align="end"
								>
									<v-badge
										v-for="(starship, starshipIndex) of personWithStarships.starships"
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
				</v-card>
			</v-col>
		</v-row>
		<v-alert type="error" v-if="error" class="error"
			>An error occurred while receiving data
		</v-alert>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapActions, mapGetters, mapState } from "vuex";
import { Person } from "@/interfaces";
import { namespace } from "./store";

@Component({
	computed: {
		...mapState(namespace, ["error", "isLoading", "errorMessage"]),
		...mapGetters(namespace, ["personWithStarships"]),
	},
	methods: {
		...mapActions(namespace, ["loadPersonInfo"]),
	},
})
export default class PersonPage extends Vue {
	error!: boolean;

	isLoading!: boolean;

	errorMessage!: string;

	personWithStarships!: Person;

	loadPersonInfo!: Function;

	goBack() {
		this.$router.go(-1);
	}

	created() {
		this.loadPersonInfo(this.$route.params.id);
	}
}
</script>
