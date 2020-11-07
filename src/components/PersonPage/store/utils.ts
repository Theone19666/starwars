import { Person, Starship } from "@/interfaces";

export default function setStarships(person: Person, starships: Starship[]) {
	const personCopy = { ...person };
	const starshipsNames: Starship[] = personCopy.starships?.map((starship: string) => {
		return starships.find((item: Starship) => item.url === starship)?.name;
	});
	personCopy.starships = starshipsNames;
	return personCopy;
}
