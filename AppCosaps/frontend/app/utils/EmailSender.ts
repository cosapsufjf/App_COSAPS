import { openInbox, openComposer } from 'react-native-email-link';

export async function sendEmail(
  to: string, 
  subject: string, 
  body: string, 
  options: { cc?: string, bcc?: string } = {}
) {
  try {
    console.log("parametros: "+ to+" "+subject+" "+body+" "+options.cc+" "+options.bcc);
    await openComposer({
      to: to,
      subject: subject,
      body: body,
      cc: options.cc,
      bcc: options.bcc,
    });
  } catch (error) {
    console.error('Erro ao abrir email:', error);
    // Fallback: abre a caixa de entrada
    await openInbox();
  }
}