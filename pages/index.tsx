import styles from "@/styles/Home.module.css";
import { useState } from "react";

const colors: string[] = ["#000000"];

let r = 0,
  g = 0,
  b = 0;

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function nextColor() {
  if (r <= 255 && g == 0 && b == 0) r += 1;
  if (r == 255 && b == 0 && g <= 255) g += 1;
  if (r == 255 && g == 255 && b <= 255) b += 1;
  if (b == 255 && g == 255 && r > 0) r -= 1;
  if (r == 0 && b == 255 && g > 0) g -= 1;
  if (r == 0 && g == 0 && b > 0) b -= 1;
  colors.push(rgbToHex(r, g, b));
  if (r != 0 || g != 0 || b != 0) nextColor();
}

nextColor();

export default function Home() {
  let [command, setCommand] = useState("");
  let [step, setStep] = useState(1);
  let [tick, setTick] = useState(1);
  return (
    <div className={styles.cont}>
      <p>1. Use __color__ to use gridient color</p>
      <p>2. Use __index__ to use index</p>
      <div className={styles.ip}>
        <div>Command</div>
        <input
          placeholder="minecraft command"
          value={command}
          onChange={(e) => {
            setCommand(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.ip}>
        <span>RGB STEP</span>
        <input
          type="number"
          min={1}
          value={step}
          onChange={(e) => {
            setStep(parseInt(e.target.value));
          }}
        ></input>
      </div>
      <div className={styles.ip}>
        <span>TICK ADD</span>
        <input
          type="number"
          min={1}
          value={tick}
          onChange={(e) => {
            setTick(parseInt(e.target.value));
          }}
        ></input>
      </div>
      <textarea
        readOnly
        value={(() => {
          let out: string[] = [];
          let ix = 0;

          for (let i = 0; i < colors.length; i += step) {
            out.push(
              command
                .replaceAll("__color__", colors[i])
                .replaceAll("__index__", ix.toString())
            );
            ix += tick;
          }

          return out.join("\n");
        })()}
      />
    </div>
  );
}
