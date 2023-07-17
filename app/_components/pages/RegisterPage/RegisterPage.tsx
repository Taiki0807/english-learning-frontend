'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../features/Auth/SignIn/AuthContext';
import { Button, Input, Select } from '../../parts';
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
  const [input, setInput] = useState('');
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
  const createCourse = async () => {
    try {
      const response = await postFetcher(
        '/wordbook/courses/',
        { name: input, user: user?.id }
      );
      const courseId = response.id;
      return courseId;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const handleSubmit = async () => {
    const courseId = await createCourse();
    if (!courseId) {
      console.error('コースの作成に失敗しました');
      return;
    }
    const requestBody = filteredItem.map((item) => {
      let word: any;
      let meaning: any;

      for (const [, value] of Object.entries(item)) {
        if (!word) {
          word = value;
        } else if (!meaning) {
          meaning = value;
        }
      }

      return {
        word: word,
        meaning: meaning,
        user: user?.id,
        course_id: courseId,
      };
    });
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
  const handleChangeInput = (value: string) => {
    setInput(value);
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
        <Input
          label="単語帳名"
          className={style.input}
          onChange={handleChangeInput}
        />
      </div>
      <Table pres={filteredItem} />
    </div>
  );
};

export default RegisterPage;
