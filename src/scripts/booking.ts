import { sendGuestRequest, sendSponsorInquiry } from './booking-request';

document.querySelectorAll<HTMLDialogElement>('[data-contact-dialog]').forEach(dialog => {
  let opener: HTMLElement | null = null;
  document.querySelectorAll<HTMLElement>('[data-dialog-target]').forEach(trigger => {
    if (trigger.dataset.dialogTarget !== dialog.id) return;
    trigger.addEventListener('click', event => {
      event.preventDefault();
      opener = trigger;
      if (!dialog.open) dialog.showModal();
      dialog.querySelector<HTMLElement>('[data-dialog-heading]')?.focus();
    });
  });
  dialog.querySelectorAll<HTMLElement>('[data-contact-close]').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
});

document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach(form => {
  const panel = form.closest<HTMLElement>('[data-contact-panel]')!;
  const fields = form.querySelector<HTMLFieldSetElement>('fieldset')!;
  const feedback = form.querySelector<HTMLElement>('.booking-feedback')!;
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const success = panel.querySelector<HTMLElement>('.booking-success')!;
  const sponsor = form.dataset.kind === 'sponsor';
  let sending = false;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.dataset.endpoint || !form.reportValidity()) return;
    const values = new FormData(form);
    const value = (key: string) => String(values.get(key) ?? '');
    sending = true;
    fields.disabled = true;
    form.setAttribute('aria-busy', 'true');
    feedback.textContent = sponsor ? 'Sending your sponsorship inquiry…' : 'Sending your guest request…';
    submit.textContent = 'Sending…';
    const send = sponsor ? sendSponsorInquiry : sendGuestRequest;
    const result = await send(form.dataset.endpoint, {
      name: value('name'), xHandle: value('xHandle'), email: value('email'),
      project: value('project'), message: value('message'), honey: value('_honey')
    });
    sending = false;
    fields.disabled = false;
    form.removeAttribute('aria-busy');
    submit.textContent = form.dataset.submitLabel + ' ↗';
    if (result.ok) {
      form.reset();
      form.hidden = true;
      success.hidden = false;
      feedback.textContent = '';
      const dialog = form.closest<HTMLDialogElement>('dialog');
      if (!dialog || dialog.open) success.focus();
    } else {
      feedback.textContent = result.message;
    }
  });
});
