<template>
	<v-app>
		<v-app-bar dark class="justify-center" app>
			<v-row justify="center" no-gutters>
				<router-link to="/" class="main-link">
					<img src="./assets/logo.png" class="logo" alt="логотип" />
				</router-link>
			</v-row>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
		</v-main>

		<v-footer dark class="pa-3">
			<v-row justify="center" no-gutters>
				<div>&copy; 2020</div>
			</v-row>
		</v-footer>
	</v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
	methods: mapActions(["loadStarships"]),
})
export default class App extends Vue {
	loadStarships!: Function;

	created() {
		this.loadStarships();
	}
}
</script>

<style lang="scss" scoped>
.main-link {
	height: 56px;
	.logo {
		width: auto;
		height: 100%;
	}
}
</style>
