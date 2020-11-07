import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PersonsList from "../components/PersonsList/PersonsList.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "home",
		component: PersonsList,
	},
	{
		path: "/person/:id",
		name: "person",
		props: true,
		// prettier-ignore
		component: () => import(/* webpackChunkName: "person" */ "../components/PersonPage/PersonPage.vue"),
	},
	{
		path: "*",
		name: "notfound",
		// prettier-ignore
		component: () => import(/* webpackChunkName: "notfound" */ "../components/NotFound/NotFound.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
