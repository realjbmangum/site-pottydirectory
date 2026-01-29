import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();

    // Get all services checked
    const services = formData.getAll('services');

    const submissionData = {
      business_name: formData.get('business_name'),
      contact_name: formData.get('contact_name'),
      contact_email: formData.get('email'),
      phone: formData.get('phone'),
      city: formData.get('city'),
      state: formData.get('state'),
      website: formData.get('website') || null,
      services_offered: services.length > 0 ? services : null,
      description: `WWETT 2026 submission. Interested in Featured: ${formData.get('interested_featured') || 'No'}, Interested in Verified: ${formData.get('interested_verified') || 'No'}`,
      status: 'pending',
      source: 'wwett2026'
    };

    const { error } = await supabase
      .from('submissions')
      .insert([submissionData]);

    if (error) {
      console.error('Supabase error:', error);
      return new Response('Error submitting form', { status: 500 });
    }

    // Redirect to success page
    return redirect('/wwett-success', 303);

  } catch (error) {
    console.error('Form submission error:', error);
    return new Response('Error submitting form', { status: 500 });
  }
};
