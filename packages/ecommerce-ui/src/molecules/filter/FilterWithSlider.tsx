import React, { useEffect, useState } from "react";
import { FilterHeader } from "../filter-items/FilterHeader";
import { Range } from "react-range";

interface FilterWithSliderProps {
  name?: string;
  setPriceRange?: (range: [number, number]) => void;
  priceRange?: [number, number];
}

export const FilterWithSlider = ({ name, setPriceRange, priceRange }: FilterWithSliderProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Initialise l'état des valeurs avec priceRange ou une plage par défaut.
  const [values, setValues] = useState<[number, number]>(priceRange || [0, 10000000]);

  // Mise à jour de l'état des valeurs lorsque priceRange change.
  useEffect(() => {
    if (priceRange) {
      setValues(priceRange);
    }
  }, [priceRange]); // Écoute les changements de priceRange

  useEffect(() => {
    // Mise à jour de la plage de prix via setPriceRange lorsqu'il change
    if (setPriceRange) {
      setPriceRange(values);
    }
  }, [values]); // Dépendances : values et setPriceRange

  return (
    <div className="border border-themeSecondary200 rounded-t-xl">
      <FilterHeader isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
      {isOpen && (
        <div className="p-6">
          <Range
            step={1}
            min={0}
            max={1000000}
            values={values}
            onChange={(newValues) => setValues([newValues[0], newValues[1]])}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  backgroundColor: "#FF6650",
                  borderRadius: "4px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "15px",
                  width: "15px",
                  borderRadius: "100%",
                  backgroundColor: "#FF6650",
                  borderColor: "white",
                }}
              />
            )}
          />
          <div className="mt-2">
            <p className="flex justify-between text-themeSecondary600 font-normal text-base">
              <span>${values[0] ? values[0].toFixed(1) : '0.0'}</span>
              <span>${values[1] ? values[1].toFixed(1) : '10000000'}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
