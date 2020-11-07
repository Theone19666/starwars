import { Starship, Person } from "@/interfaces";

export default function setStarships(persons: Person[], starships: Starship[]) {
	return persons.map((person: Person) => {
		if (!person.starships) {
			return person;
		}
		const personCopy = { ...person };
		const starshipsNames = personCopy.starships.map((starship: string) => {
			return starships.find((item: Starship) => item.url === starship)?.name;
		});
		personCopy.starships = starshipsNames as string[];
		return personCopy;
	});
}
