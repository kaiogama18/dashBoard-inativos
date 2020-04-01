import { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class Harvest extends Component {
  render() {
    return (
      <div className="self-start grid grid-cols-1 xl:grid-cols-3 col-span-2 rounded-md overflow-hidden shadow bg-white p-6">
        <div className="flex-col self-center">
          <p className="text-xl uppercase">Selecione sua Safra</p>
          <p className="text-sm">
            Delize o botão para selecionar o ano e <br />
            clique no mês correspondente
          </p>
        </div>
        <div className="flex col-span-2 justify-center  m-1">
          <div className="m-1 flex flex-col items-center">
            <p className="text-sm font-bold mb-2">01/2018</p>
            <button class="bg-blue-500 h-20 w-5 hover:bg-yellow-400" />
          </div>
          <div className="m-1 flex flex-col items-center">
            <p className="text-sm font-bold mb-2">02/2018</p>
            <button class="bg-blue-500 h-20 w-5 hover:bg-yellow-400" />
          </div>
          <div className="m-1 flex flex-col items-center">
            <p className="text-sm font-bold mb-2">03/2018</p>
            <button class="bg-blue-500 h-20 w-5 hover:bg-yellow-400" />
          </div>
          <div className="m-1 flex flex-col items-center">
            <p className="text-sm font-bold mb-2">04/2018</p>
            <button class="bg-blue-500 h-20 w-5 hover:bg-yellow-400" />
          </div>
          <div className="m-1 flex flex-col items-center">
            <p className="text-sm font-bold mb-2">05/2018</p>
            <button class="bg-blue-500 h-20 w-5 hover:bg-yellow-400" />
          </div>
          <div className="m-1 flex flex-col items-center">
            <p className="text-sm font-bold mb-2">06/2018</p>
            <button class="bg-blue-500 h-20 w-5 hover:bg-yellow-400" />
          </div>
        </div>
      </div>
    );
  }
}
