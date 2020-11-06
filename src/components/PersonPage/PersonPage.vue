<template>
	<v-container>
		<div class="text-center progress-bar" v-if="!personInfo.name">
			<v-progress-circular indeterminate color="#419494"></v-progress-circular>
		</div>
		<v-row justify="center" v-else>
			<v-col lg="6" md="8" sm="8" cols="12">
				<v-card>
					<v-card-title>
						<v-row>
							<v-col>
								<h1>{{ personInfo.name }}</h1>
							</v-col>
							<v-col class="text-right">
								<router-link :to="{ name: 'home' }" class="back-btn">
									<v-btn color="#419494">Go back</v-btn>
								</router-link>
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-text>
						<v-row>
							<v-col>Birth year</v-col>
							<v-col class="text-right">{{ personInfo.birth_year || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Gender</v-col>
							<v-col class="text-right">{{ personInfo.gender || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Height</v-col>
							<v-col class="text-right">{{ personInfo.height || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Mass</v-col>
							<v-col class="text-right">{{ personInfo.mass || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Hair color</v-col>
							<v-col class="text-right">{{ personInfo.hair_color || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Skin color</v-col>
							<v-col class="text-right">{{ personInfo.skin_color || "unknown" }}</v-col>
						</v-row>
						<v-row>
							<v-col>Eye color</v-col>
							<v-col class="text-right">{{ personInfo.eye_color || "unknown" }}</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import BASE_URL from "@/config";
import { Person } from "@/interfaces";

@Component
export default class PersonPage extends Vue {
	personInfo = {} as Person;

	getPersonInfo() {
		const personId = this.$route.params.id;
		fetch(`${BASE_URL}/people/${personId}`)
			.then((resp) => resp.json())
			.then((result: Person) => {
				this.personInfo = result;
			});
	}

	created() {
		this.getPersonInfo();
	}
}
</script>
