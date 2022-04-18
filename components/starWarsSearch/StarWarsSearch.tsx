import React, { useCallback, useEffect, useState } from "react";
import { getPeople, StarWarsPerson } from "../../services/starWarsApi";
import { List, ListItem } from "../core/list";
import { TextInput } from "../core/textInput";
import styles from "./StarWarsSearch.module.css";
import StarWarsPersonDetail from "./StarWarsPersonDetail";
import { useQuery } from "react-query";
import { Spinner } from "../core/spinner";

/**
 * Search for people in the Star Wars universe by name, results rendered as the user types
 */
const StarWarsSearch = () => {
  /* searchInput is what the user types into the search bar, queryInput is what we feed into
    the getPeople query. We want to debounce updates to queryInput so we only trigger the query
    when the user is done typing */
  const [searchInput, setSearchInput] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<StarWarsPerson | null>(
    null
  );

  const {
    isLoading,
    isError,
    data: people = [],
    refetch,
  } = useQuery<StarWarsPerson[]>(["people", queryInput], () =>
    getPeople(queryInput)
  );

  const handleTextInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  const handlePersonClicked = (person: StarWarsPerson) => {
    setSelectedPerson(person);
  };

  const handleCloseSpeciesModal = useCallback(() => {
    setSelectedPerson(null);
  }, [setSelectedPerson]);

  useEffect(() => {
    const debouncedSetSearchQuery = setTimeout(() => {
      setQueryInput(searchInput);
    }, 250);
    return () => clearTimeout(debouncedSetSearchQuery);
  }, [searchInput, refetch]);

  let results;
  if (isError) {
    results = (
      <div>Something went wrong while while fetching StarWars people.</div>
    );
  } else {
    results = (
      <List>
        {people.map((person) => (
          <ListItem key={person.url}>
            <div
              onClick={() => handlePersonClicked(person)}
              className={styles.personResult}
            >
              {person.name}
            </div>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <>
      <div className={styles.search}>
        <TextInput
          maxLength={200}
          placeHolder="Search"
          value={searchInput}
          onChange={handleTextInputChanged}
        />
        {isLoading && <Spinner />}
      </div>
      {results}
      {selectedPerson && (
        <StarWarsPersonDetail
          closeModal={handleCloseSpeciesModal}
          person={selectedPerson}
        />
      )}
    </>
  );
};

export default StarWarsSearch;
