import { sendGTMEvent } from "@next/third-parties/google";

export const GATimeSpent = (currentPage: string, sectionName: string): IntersectionObserver => {
  let startTime = -1; // Initial start time

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && startTime < 0) {
          startTime = performance.now(); // Start the timer
        }

        if (!entry.isIntersecting && startTime > 0) {
          const endTime = performance.now();
          const timeSpent = Math.round((endTime - startTime) / 1000); // Convert milliseconds to seconds
          sendGTMEvent({
            event: "time_spent",
            current_page: currentPage,
            section_name: sectionName,
            duration: `${timeSpent}s`
          });
          startTime = -1; // Reset the start time
        }
      });
    },
    { threshold: 0.5 }
  );

  return observer
}

export const GAClick = (currentPage: string, sectionName: string, componentName: string) => {
  sendGTMEvent({
    event: "clicked",
    current_page: currentPage,
    section_name: sectionName,
    component_name: componentName
  });
}