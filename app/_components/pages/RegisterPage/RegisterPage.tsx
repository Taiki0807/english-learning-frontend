'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../features/LoginForm/AuthContext';
import { Button, Select } from '../../parts';
import style from './RegisterPage.module.css';
import Table from './components/Table';
import { UploadWord } from '@/app/_components/features';
import { postFetcher } from '@/utils/httpClient';

const RegisterPage = () => {
  const router = useRouter();
  /*様々なデータに対応するためany */
  const [pres, setPres] = useState<any[]>([]);
  const [optionKeys, setOptionKeys] = useState<string[]>(
    []
  );
  const [filterValues, setFilterValues] = useState<
    string[]
  >([]);
  const [filteredItem, setFilteredItem] =
    useState<any[]>(pres);
  const { user } = useAuthContext();
  useEffect(() => {
    if (pres && pres.length > 0) {
      const keys = Object.keys(pres[0]).map(
        (key: string) => key
      );
      setOptionKeys(keys);
    }
  }, [pres]);
  const handleChange = (selectedValue: string) => {
    setFilterValues((prevFilterValues) => {
      const newFilterValues = [...prevFilterValues];
      newFilterValues[0] = selectedValue;
      return newFilterValues;
    });
  };

  const handleChange2 = (selectedValue: string) => {
    setFilterValues((prevFilterValues) => {
      const newFilterValues = [...prevFilterValues];
      newFilterValues[1] = selectedValue;
      return newFilterValues;
    });
  };
  const handleSubmit = async () => {
    const requestBody = filteredItem.map((item) => ({
      word: item.Index,
      meaning: item.Eage,
      user: user?.id,
      course_id: 'JLR4X7jBQqpFX84WBzvVTT',
    }));
    try {
      await postFetcher(
        '/wordbook/flashcards/',
        requestBody
      );
    } catch (error) {
      console.error(error);
    }
    router.push('/wordlearning');
  };

  useEffect(() => {
    if (!filterValues[0]) {
      setFilteredItem(pres);
    } else {
      const filteredPres = pres.map((item) => {
        const filteredItem: { [key: string]: any } = {};

        filterValues.forEach((key) => {
          if (
            Object.prototype.hasOwnProperty.call(item, key)
          ) {
            filteredItem[key] = item[key];
          }
        });

        return filteredItem;
      });
      setFilteredItem(filteredPres);
    }
  }, [pres, filterValues]);

  return (
    <div className={style.registerPage}>
      <div className={style.table__title}>
        <h2>単語登録</h2>
      </div>

      <UploadWord pres={pres} setPres={setPres} />
      <div className={style.table__title}>
        <h2>単語一覧確認</h2>
        <Button onClick={handleSubmit}>登録</Button>
      </div>
      <div className={style.table__top}>
        <Select
          label="単語のカラム名を選択"
          className={style.select}
          data={optionKeys}
          onChange={handleChange}
        />
        <Select
          label="意味のカラム名を選択"
          className={style.select}
          data={optionKeys}
          onChange={handleChange2}
        />
      </div>
      <Table pres={filteredItem} />
    </div>
  );
};

export default RegisterPage;
