'use client'

import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface MultiSelectProps {
  desc? : string;
  isDetail? : boolean;
  children? : React.ReactNode;
  onChange : (input: string[]) => void;
	provinsi: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ onChange, provinsi, isDetail, children, desc }) => {
  const options = TheOptions(provinsi)
  
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherOptionInput, setOtherOptionInput] = useState<string>('');
  const [drop, setDrop] = useState<boolean>(false);

  // useEffect(() => {
  //   const result = selectedOptions.includes('Others') && otherOption
  //     ? [...selectedOptions.filter(option => option !== 'Others'), otherOption]
  //     : selectedOptions;
  //   onChange(result);
  // }, [selectedOptions, otherOption]);

  useEffect(() => {
    const otherOptions = otherOptionInput.split(',').map(item => item.trim()).filter(item => item);
    const result = selectedOptions.includes('Others') && otherOptionInput
      ? [...selectedOptions.filter(option => option !== 'Others'), ...otherOptions]
      : selectedOptions;
    onChange(result);
  }, [selectedOptions, otherOptionInput]);

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((o) => o !== option)
        : [...prevSelectedOptions, option]
    );
  };

  const handleOtherOptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherOptionInput(e.target.value);
    if (e.target.value) {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.includes('Others')
          ? prevSelectedOptions
          : [...prevSelectedOptions, 'Others']
      );
    } else {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter((o) => o !== 'Others')
      );
    }
  }


  return (
    <>
      <div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full max-w-[600px] overflow-hidden '>
        <div className='flex justify-between items-center w-full max-w-[700px] overflow-hidden'>
          <p className='font-semibold w-full text-wrap sm:text-lg mb-1'>Kawasan Prioritas <span className='text-red-600'>*</span><span className='pl-1 bg-white text-xs font-normal selection:text-orange-500/90'>{` ('Others' ketika pilihan tidak tersedia)`}</span></p>
          {isDetail &&
						<button type='button' className='flex items-center justify-center gap-2 group w-fit' onClick={() => {setDrop(!drop)}}>
							{drop ?
								<>
									<p className='text-xs text-indigo-500 border w-fit'>more information</p>
									<div className='flex items-center justify-center border p-1 rounded-full border-indigo-500'>
										<FaChevronDown className='max-h-2 max-w-2 text-indigo-700 rotate-180 transition-all duration-150'/>
									</div>
								</>
								:
								<>
									<p className='text-xs group-hover:text-indigo-500 transition-all duration-150'>more information</p>
									<div className='flex items-center justify-center border border-black/30 p-1 rounded-full group-hover:border-indigo-500 transition-all duration-150'>
										<FaChevronDown className='max-h-2 max-w-2 group-hover:text-indigo-700 transition-all duration-150'/>
									</div>
								</>
							}
						</button>
					}
        </div>
        {options.map((option) => (
          <div key={option}>
            <label className='flex gap-2'>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
        <div className='flex gap-2'>
          <label className='flex gap-2 has-[:checked]:py-[6px]'>
            <input
              type="checkbox"
              value="Others"
              checked={selectedOptions.includes('Others')}
              onChange={() => handleOptionChange('Others')}
            />
            Others
          </label>
          {selectedOptions.includes('Others') && (
            <input
              type="text"
              required
              value={otherOptionInput}
              onChange={handleOtherOptionInputChange}
              placeholder="Kawasan A, Kawasan B ,..., Kawasan C"
              className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:border-indigo-500/80 w-full text-wrap'
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MultiSelect;


function TheOptions(provinsi : string) {
  const [options, setOptions] = useState<string[]>([])
  
  useEffect(() => {
    if (provinsi == 'Riau') {
      setOptions([
        "KI Dumai",
        "KSPN Pulau Rupat dan sekitarnya",
        "KPPN Muara Takus Kampar dan sekitarnya",
        "PKN Pekanbaru",
        "PKSN Bengkalis"
      ])
    } else if (provinsi == 'Aceh') {
      setOptions([
        "KI Ladong",
        "KEK Arun Lhokseumawe",
        "PKW Meulaboh",
        "KSPN Sabang",
        "KPPN Simeulue",
        "KPPN Takengon",
        "PKN Banda Aceh",
        "PKW Lhokseumawe",
        "PKW Takengon"
      ])
    } else if (provinsi === 'Bengkulu') {
      setOptions([
        "Pulau Enggano",
        "PKN Bengkulu",
        "PKW Mukomuko",
        "PKW Curup",
        "PKW Manna"
      ]);
    } else if (provinsi === 'Kalimantan Timur') {
      setOptions([
        "KI Kariangau",
        "KI Buluminung",
        "DPP Baru Derawan Berau / KSPN Derawan Sangalaki dsk"
      ]);
    } else if (provinsi === 'Nusa Tenggara Timur') {
      setOptions([
        "DPP Labuan Bajo",
        "Kawasan Andalan Pariwisata Komodo dsk",
        "Kawasan Andalan Pariwisata Ruteng – Bajawa",
        "KSPN Ende - Kelimutu",
        "Kawasan Andalan Pariwisata Maumere – Ende",
        "KPPN Manggarai Barat",
        "Kawasan Andalan Pertanian Kupang dsk"
      ]);
    } else if (provinsi === 'Nusa Tenggara Barat') {
      setOptions([
        "Kawasan Pertanian NTB",
        "KSPN Gili Tramenda",
        "KSPN Pantai Selatan Lombok",
        "PKN Mataram",
        "PKW Sumbawa Besar"
      ]);
    } else if (provinsi == 'Sumatera Utara') {
      setOptions([
        "WM Mebidangro",
        "Kawasan Industri Perkotaan Sei Mangkei - Kuala Tanjung",
        "Kawasan Pertanian Terpadu",
        "KSPN Danau Toba",
        "KSPN Tangkahan",
        "Daerah 3T Kepulauan Nias"
      ])
    } else if (provinsi == 'Sumatera Selatan') {
      setOptions([
        "Kawasan Pertanian Lampung Tengah",
        "KPPN Mesuji",
        "PKN Bandar Lampung",
        "PKW Metro",
        "KSPN Way Kambas dskt di Kabupaten Lampung Timur",
        "KSPN Krakatau dskt di Kabupaten Lampung Selatan",
        "KI Tanjung Enim",
        "PKN Patungraya Agung (Wilayah Metropolitan Palembang)",
        "Kawasan Pertanian Kabupaten Banyuasin",
        "Kawasan Pertanian Kabupaten OKI",
        "Kawasan Pertanian Kabupaten OKU Timur"
      ])
    } else if (provinsi == 'Lampung') {
      setOptions([
        "Kawasan Pertanian Lampung Tengah",
        "KPPN Mesuji",
        "PKN Bandar Lampung",
        "PKW Metro",
        "KSPN Way Kambas dskt di Kabupaten Lampung Timur",
        "KSPN Krakatau dskt di Kabupaten Lampung Selatan",
        "KI Tanjung Enim",
        "PKN Patungraya Agung (Wilayah Metropolitan Palembang)",
        "Kawasan Pertanian Kabupaten Banyuasin",
        "Kawasan Pertanian Kabupaten OKI",
        "Kawasan Pertanian Kabupaten OKU Timur"
      ])
    } else if (provinsi == 'DKI Jakarta') {
      setOptions(['Jabodetabek'])
    } else if (provinsi == 'Banten') {
      setOptions([
        "PKN Serang—PKN Cilegon",
        "KSPN Ujung Kulon—Tanjung Lesung",
        "Koridor Serang—Panimbang",
        "Kawasan Desa Tertinggal Kabupaten: Pandeglang dan Lebak"
      ])
    } else if (provinsi == 'Jawa Barat') {
      setOptions([
        "Cekungan Bandung",
        "Rebana",
        "DPP Bandung—Halium—Ciletuh",
        "Jawa Barat Selatan",
        "Jabodetabek"
      ])
    } else if (provinsi == 'Jawa Tengah') {
      setOptions([
        "KIT Batang",
        "KEK Kendal",
        "KI Demak",
        "Kluster Kawasan Industri Semarang",
        "KI Cilacap",
        "Kawasan Pertanian Metropolitan Kedungsepur",
        "Kawasan Pertanian Kabupaten Cilacap",
        "Kawasan Pertanian Kabupaten Pati",
        "Kawasan Pertanian Kabupaten Sragen",
        "KSPN Borobudur—Mendut—Pawon",
        "KSPN Dieng dskt"
      ])
    } else if (provinsi == 'Jawa Timur') {
      setOptions([
        "KI Gresik",
        "KEK Gresik",
        "KEK Singasari",
        "Kawasan Prioritas Selingkar Ijen",
        "Kawasan Prioritas Gerbangkertosusila",
        "Kawasan Prioritas Selingkar Wilis",
        "Kawasan Prioritas Bromo Tengger Semeru",
        "Kawasan Prioritas Madura dan Kepulauan"
      ])
    } else if (provinsi == 'Bali') {
      setOptions([
        "Kawasan Prioritas Sarbagita",
        "Kawasan Prioritas Nusa Penida",
        "Kawasan Prioritas Ulapan/Ubud",
        "Kawasan Prioritas Bedugul",
        "Kawasan Prioritas Pertanian Sarbagita",
        "Kawasan Prioritas Singaraja"
      ])
    } else if (provinsi == 'Sulawesi Utara') {
      setOptions([
        "KEK/KI Bitung",
        "KPPN Manado Kota dsk",
        "KPPN/KSPN Bunaken dsk",
        "KPPN/KSPN Bitung—Lembeh dsk",
        "KPPN Likupang dsk/KEK Likupang",
        "PKN/KSN Manado—Bitung",
        "PKW Tomohon",
        "PKW Tondano"
      ])
    } else if (provinsi === 'Sulawesi Tenggara') {
      setOptions([
        "PKN Kendari",
        "KSPN Wakatobi",
        "KI Konawe"
      ]);
    } else if (provinsi === 'Sulawesi Selatan') {
      setOptions([
        "Kawasan Pertanian Kabupaten Bone",
        "Kawasan Pertanian Kabupaten Wajo",
        "KI Bantaeng",
        "KSPN Toraja",
        "KSPN Takabonerate",
        "KPPN Makassar",
        "PKN Mamminasata"
      ]);
    } else if (provinsi == 'Maluku Utara') {
      setOptions([
        "PKN Ternate",
        "PKW Tidore",
        "Kota Baru Sofifi",
        "KPPN Morotai/KSPN Morotai/KEK Morotai",
        "KPPN Ternate",
        "KPPN Tidore",
        "KI Weda",
        "KI Buli",
        "KI Obi",
        "SKPT Morotai",
        "PKW Sanan",
        "PKW Labuha"
      ])
    } else if (provinsi == 'Maluku') {
      setOptions([
        "PKN Ambon",
        "PKW Masohi",
        "PKW Wahai",
        "PKW Tual—Langgur",
        "PKSN Saumlaki",
        "PKSN Dobo",
        "SKPT Saumlaki",
        "SKPT Moa",
        "KSPN Banda Neira",
        "KPPN Ambon",
        "KPPN Buru",
        "KPPN Manusela—Masohi",
        "KPPN Tanimbar",
        "KPPN Kei",
        "PKSN Ilwaki",
        "Pulau Ararkula, Pulau Karerei, Pulau Penambulai, Pulau Kultubai Baru, Pulau Kultubai Selatan, Pulau Karang, Pulau Enu, Pulau Batugoyang",
        "Nuhuyut",
        "Pulau 3T P. Seram",
        "Pulau 3T P. Aru",
        "Pulau 3T P. Kei Besar",
        "Kawasan Pertanian dan Perkebunan Pulau Seram",
        "Kawasan Pertanian dan Perkebunan Pulau Buru"
      ])
    } else {
      setOptions([])
    }
  }, [provinsi])

  return options 
}