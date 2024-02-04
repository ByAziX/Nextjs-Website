// Assurez-vous que SortFilter met à jour l'URL en fonction du tri sélectionné
import { useRouter } from 'next/router';

const SortFilterNFT: React.FC<{ value: string }> = ({ value }) => {
  const router = useRouter();

  const handleChange = (newValue: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, NFTSort: newValue, page: 1 }, // Réinitialiser à la page 1 lors du changement de tri
    });
  };

  return (
    <select value={value} onChange={(e) => handleChange(e.target.value)}>
      <option value="TIMESTAMP_LISTED_DESC">Plus récents</option>
      <option value="TIMESTAMP_LISTED_ASC">Plus anciens</option>
    </select>
  );
};

export default SortFilterNFT;