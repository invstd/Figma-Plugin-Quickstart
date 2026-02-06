import { showUI, on, emit } from '@create-figma-plugin/utilities';

export default function () {
  // Show plugin UI - themeColors MUST be true for design tokens to work!
  showUI({ width: 400, height: 500 }, { themeColors: true });

  // Handle messages from UI
  on('submit-message', (data: { message: string }) => {
    figma.notify(`Received: ${data.message}`);
    
    // Send response back to UI
    emit('example-event', { success: true });
  });
}
