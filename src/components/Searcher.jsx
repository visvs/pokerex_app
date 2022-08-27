import { Input } from 'antd';

export const Searcher = ({searchWord, onChange}) => {

  return <Input.Search placeholder='Buscar...' value={searchWord} onChange={onChange} style={{ marginBottom: 10 }} />;
};

