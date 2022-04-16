import React, { useEffect, useState } from "react";
import { getPeople, StarWarsPerson } from "../../services/starWarsApi";
import { List, ListItem } from "../core/list";
import { TextInput } from "../core/textInput";
import styles from "./StarWarsSearch.module.css";
import { useQuery } from "react-query";

const StarWarsSearch = () => {
  const [searchInput, setSearchInput] = useState(""); // user input
  const [queryInput, setQueryInput] = useState(""); // input used for API call -- updates are debounced
  const {
    isError,
    data: people = [],
    refetch,
  } = useQuery<StarWarsPerson[]>(["people", queryInput], () =>
    getPeople(queryInput)
  );
  const handleTextInputChanged = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(e.currentTarget.value);
  };

  useEffect(() => {
    const debouncedSetSearchQuery = setTimeout(() => {
      // user has finished typing, so we can update queryInput to trigger
      // the getPeople query
      setQueryInput(searchInput);
    }, 250);
    return () => clearTimeout(debouncedSetSearchQuery);
  }, [searchInput, refetch]);

  const handlePersonClicked = (person: StarWarsPerson) => {
    console.log(`PERSON CLICKED: ${person.name}`);
  };

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
    </>
  );
};

export default StarWarsSearch;
