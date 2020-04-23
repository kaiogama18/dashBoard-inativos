import React, { useState, useEffect } from 'react';
import Card from '../Cards/Card';
import cx from 'classnames';
import useSWR from 'swr';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

const cropTitle = 'Clique para selecionar o ano e mês correspondente';
const numbers = [
  '201804',
  '201805',
  '201806',
  '201807',
  '201808',
  '201809',
  '201810',
  '201811',
  '201812',
];
const CropPicker = ({ handleCropChange }) => {
  const { data, error } = useSWR('/api/inativo', fetcher);

  return (
    <Card className={cx('card', 'card-picker')}>
      <div className="self-center">
        <p className="card-title">{data?.menssage}</p>
        <p className="card-subtitle">{cropTitle}</p>
      </div>

      <div className="crop-colunm">
        <div className="crop-colunm__item">
          <button className="crop-colunm__btn disabled" />
          <p>201801</p>
        </div>
        {data?.data.reverse().map((aux, i) => (
          <div key={i} className="crop-colunm__item">
            <button
              className="crop-colunm__btn"
              onClick={(e) => handleCropChange(aux.safra)}
            />
            <p>{aux.safra}</p>
          </div>
        ))}

        {numbers.map((aux, i) => (
          <div key={i} className="crop-colunm__item">
            <button className="crop-colunm__btn disabled" />
            <p>{aux}</p>
          </div>
        ))}
      </div>

      {/* <div className="crop">
        {data?.data.map((aux, i) => (
          <div key={i} className="crop-picker">
            <button
              className="btn-picker"
              onClick={(e) => handleCropChange(aux.safra)}
            />
            <p>{aux.safra}</p>
          </div>
        ))}
      </div> */}
    </Card>
  );
};

export default CropPicker;
