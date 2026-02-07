import type React from "react";
import "./CustomSlider.scss";

interface CustomSliderProps {
  min: number;
  max: number;
  value: [number, number];
  step?: number;
  onChange: (value: [number, number]) => void;
  onCommit: () => void;
  icon?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  value,
  step = 0.01,
  onChange,
  onCommit,
  icon = "$"
}) => {
  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1] - step);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0] + step);
    onChange([value[0], newMax]);
  };

  return (
    <div className="slider-wrapper">
      <div className="slider">
        <div className="slider-track">
          <div
            className="slider-range"
            style={{
              left: `${getPercent(value[0])}%`,
              width: `${getPercent(value[1]) - getPercent(value[0])}%`,
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleMinChange}
          onMouseUp={onCommit}
          onTouchEnd={onCommit}
          className="slider-input slider-input--min"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={handleMaxChange}
          onMouseUp={onCommit}
          onTouchEnd={onCommit}
          className="slider-input slider-input--max"
        />
      </div>
      <div className="range-display">
        <span className="range-value">{icon}{value[0].toFixed(2)}</span>
        <span className="range-separator">to</span>
        <span className="range-value">{icon}{value[1].toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CustomSlider;
