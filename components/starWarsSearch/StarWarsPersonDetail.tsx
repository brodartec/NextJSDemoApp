import { getSpecies, StarWarsPerson } from "../../services/starWarsApi";
import styles from "./StarWarsPersonDetail.module.css";
import { Modal } from "../core/modal";
import { useQuery } from "react-query";

type StarWarsPersonDetailProps = {
  person: StarWarsPerson;
  closeModal: () => void;
};
const StarWarsPersonDetail = ({
  person,
  closeModal,
}: StarWarsPersonDetailProps) => {
  const {
    isError,
    data: species,
  } = useQuery(["person", person.name], () => getSpecies(person), {
    refetchOnMount: false,
  });
  let content;
  if (isError) {
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
