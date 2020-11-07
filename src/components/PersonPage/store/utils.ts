import { Person, Starship } from "@/interfaces";

export default function setStarships(person: Person, starships: Starship[]) {
	const personCopy = { ...person };
	const starshipsNames = personCopy.starships.map((starship) => {
		return starships.find((item: Starship) => item.url === starship)?.name;
	});
	personCopy.starships = starshipsNames as string[];
	return personCopy;
}
