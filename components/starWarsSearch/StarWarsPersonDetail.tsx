import { getSpecies, StarWarsPerson } from "../../services/starWarsApi";
import styles from "./StarWarsPersonDetail.module.css";
import { Modal } from "../core/modal";
import { useQuery } from "react-query";
import { Spinner } from "../core/spinner";

type StarWarsPersonDetailProps = {
  person: StarWarsPerson;
  closeModal: () => void;
};

/**
 * Fetch and display the species for the passed in StarWarsPerson
 */
const StarWarsPersonDetail = ({
  person,
  closeModal,
}: StarWarsPersonDetailProps) => {
  const {
    isLoading,
    isError,
    data: species,
  } = useQuery(["person", person.name], () => getSpecies(person));

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <div>Something went wrong while fetching species info.</div>;
  } else {
    content = <span>{`Species: ${species}`}</span>;
  }
  return (
    <Modal onClose={closeModal}>
      <div className={styles.speciesInfo}>
        <div className={styles.detailsHeader}>
          <h2 className={styles.personName}>{person.name}</h2>
          <span className={styles.closeIcon} onClick={closeModal}>
            X
          </span>
        </div>
        {content}
      </div>
    </Modal>
  );
};

export default StarWarsPersonDetail;
