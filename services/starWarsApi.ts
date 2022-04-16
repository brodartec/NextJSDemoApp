export type StarWarsPerson = {
  name: string;
  species: string[];
  url: string;
};

export const SW_API_BASE_URL = "https://swapi.dev/api";

/**
 * Fetches a list of people from the StarWars universe with names
 * that contain provided searchTerm
 * @param searchTerm must be at least 2 chars to get results
 */
export const getPeople = async (searchTerm: string) => {
  if (searchTerm.length < 2) return [];
  const res = await fetch(`${SW_API_BASE_URL}/people?search=${searchTerm}`);
  if (!res.ok) throw new Error("FETCH FAILED");
  const resBody = await res.json();
  return resBody.results as StarWarsPerson[];
};

/**
 * Fetches the name of a StarWarsPerson's species, if no species info is
 * available, will return 'unknown'
 * @param person
 */
export const getSpecies = async (person: StarWarsPerson) => {
  if (person?.species?.length < 1) return "unknown";
  const res = await fetch(person.species[0]);
  if (!res.ok) throw new Error("FETCH FAILED");
  const resBody = await res.json();
  return resBody.name as String;
};
