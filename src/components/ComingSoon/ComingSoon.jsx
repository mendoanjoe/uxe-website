import React from "react";
import styles from "./ComingSoon.module.scss";

const ComingSoon = () => {
  return (
    <div className={styles.comingSoon}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <div className={styles.logoLeftSide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="438"
              height="315"
              viewBox="0 0 438 315"
              fill="none"
            >
              <path
                d="M380.803 171.233L293.992 263.748C291.311 266.585 291.438 271.06 294.275 273.74L335.763 312.841C338.6 315.52 343.072 315.394 345.754 312.557L435.898 217.09C437.139 215.778 437.83 214.042 437.83 212.236L437.834 100.765C437.834 98.9598 437.144 97.2238 435.904 95.9118L337.082 2.29446C334.4 -0.542874 329.928 -0.670871 327.091 2.01046L290.664 40.6678C287.827 43.3478 287.699 47.8211 290.38 50.6598L380.803 136.076C382.043 137.388 382.732 139.124 382.732 140.929V166.378C382.732 168.184 382.043 169.921 380.803 171.233Z"
                fill="#FF8B00"
              />
              <path
                d="M267.079 46.1824V269.37C267.079 283.026 256.009 294.097 242.353 294.097H124.065C55.6086 294.097 0.115234 238.602 0.115234 170.148V46.1824C0.115234 42.4118 3.17124 39.3558 6.94057 39.3558H51.7232C55.4939 39.3558 58.5499 42.4118 58.5499 46.1824V170.905C58.5499 206.23 87.1859 234.866 122.51 234.866H201.581C205.483 234.866 208.646 231.702 208.646 227.801V46.1824C208.646 42.4118 211.702 39.3558 215.471 39.3558H260.253C264.023 39.3558 267.079 42.4118 267.079 46.1824Z"
                fill="white"
              />
            </svg>
          </div>

          <div className={styles.logoRightSide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="415"
              height="315"
              viewBox="0 0 415 315"
              fill="none"
            >
              <path
                d="M57.2064 171.229L144.017 263.744C146.698 266.581 146.572 271.056 143.734 273.736L102.246 312.837C99.4091 315.516 94.9371 315.391 92.2558 312.553L2.11178 217.087C0.870447 215.775 0.179779 214.039 0.179779 212.232L0.175781 100.761C0.175781 98.9559 0.865113 97.2199 2.10511 95.9079L100.928 2.29055C103.609 -0.54678 108.081 -0.674777 110.918 2.00656L147.345 40.6639C150.182 43.3439 150.31 47.8172 147.629 50.6559L57.2064 136.072C55.9664 137.384 55.2771 139.12 55.2771 140.925V166.375C55.2771 168.18 55.9664 169.917 57.2064 171.229Z"
                fill="white"
              />
              <path
                d="M229.119 102.838V232.745C229.119 236.514 232.175 239.57 235.945 239.57H407.391C411.161 239.57 414.217 242.628 414.217 246.397V288.336C414.217 292.105 411.161 295.161 407.391 295.161H195.411C181.755 295.161 170.685 284.09 170.685 270.436V65.1464C170.685 51.4918 181.755 40.4211 195.411 40.4211H407.391C411.161 40.4211 414.217 43.4771 414.217 47.2478V89.1864C414.217 92.9558 411.161 96.0118 407.391 96.0118H235.945C232.175 96.0118 229.119 99.0678 229.119 102.838Z"
                fill="white"
              />
              <path
                d="M251.98 145.327V190.251C251.98 193.196 254.368 195.584 257.313 195.584H375.55C378.496 195.584 380.884 193.196 380.884 190.251V145.327C380.884 142.381 378.496 139.993 375.55 139.993H257.313C254.368 139.993 251.98 142.381 251.98 145.327Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className={styles.title}>
          <h1>
            <span>Coming</span> Soon
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
