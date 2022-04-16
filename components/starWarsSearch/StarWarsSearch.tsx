import React, { useCallback, useEffect, useState } from "react";
import { getPeople, StarWarsPerson } from "../../services/starWarsApi";
import { List, ListItem } from "../core/list";
import { TextInput } from "../core/textInput";
import styles from "./StarWarsSearch.module.css";
import StarWarsPersonDetail from "./StarWarsPersonDetail";
import { useQuery } from "react-query";

const PersonDetailModal = React.memo(
  StarWarsPersonDetail,
  (prevProps, nextProps) => prevProps?.person?.name === nextProps?.person?.name
);

const StarWarsSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const {
    isError,
    data: people = [],
    refetch,
  } = useQuery<StarWarsPerson[]>(["people", queryInput], () =>
    getPeople(queryInput)
  );
  const [selectedPerson, setSelectedPerson] = useState<StarWarsPerson | null>(
    null
  );
  const handleTextInputChanged = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(e.currentTarget.value);
  };

  useEffect(() => {
    const debouncedSetSearchQuery = setTimeout(() => {
      setQueryInput(searchInput);
    }, 250);
    return () => clearTimeout(debouncedSetSearchQuery);
  }, [searchInput, refetch]);

  const handlePersonClicked = (person: StarWarsPerson) => {
    setSelectedPerson(person);
  };

  const handleCloseSpeciesModal = useCallback(() => {
    setSelectedPerson(null);
  }, [setSelectedPerson]);

  let results;
  // TODO: implement & display a spinner while search is running
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
          placeHolder="Search"
          value={searchInput}
          onChange={handleTextInputChanged}
        />
      </div>
      {results}
      {selectedPerson && (
        <PersonDetailModal
          closeModal={handleCloseSpeciesModal}
          person={selectedPerson}
        />
      )}
    </>
  );
};

export default StarWarsSearch;
