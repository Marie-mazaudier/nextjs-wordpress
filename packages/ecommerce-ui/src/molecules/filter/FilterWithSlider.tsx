import React from "react";
import { FilterHeader } from "../filter-items/FilterHeader";
import { Range } from "react-range";

interface FilterWithSliderProps {
  name?: string;
  setPriceRange?: any;
}

export const FilterWithSlider = ({ name, setPriceRange }: FilterWithSliderProps) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const [values, setValues] = React.useState([0, 999]);

  React.useEffect(() => {
    setPriceRange(values);
  }, [values]);

  return (
    <div className="border border-themeSecondary200 rounded-t-xl">
      <FilterHeader isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
      {isOpen && (
        <div className="p-6">
          <Range
            step={1}
            min={0}
            max={1000}
            values={values}
            onChange={(values) => setValues(values)}
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
              <span>${values[0].toFixed(1)}</span>
              <span>${values[1].toFixed(1)}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
