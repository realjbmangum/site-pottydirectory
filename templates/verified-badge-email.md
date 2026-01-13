# Verified Badge Email Template

Send this email after a vendor submits the verification request form.

---

**Subject:** Get Your Verified Badge on Potty Directory

---

Hi [BUSINESS NAME],

Thanks for requesting your Verified Provider badge on Potty Directory! Here's how to get it:

## Step 1: Add This Badge to Your Website

Copy and paste this code anywhere on your website (footer, about page, or homepage works great):

```html
<a href="https://pottydirectory.com" target="_blank" rel="noopener">
  <img src="https://pottydirectory.com/verified-large.png" alt="Verified Provider on Potty Directory" style="max-width: 150px;">
</a>
```

Or simply download the badge and add it with a link back to pottydirectory.com:
https://pottydirectory.com/verified-large.png

## Step 2: Let Us Know

Once the badge is live on your site, reply to this email with the URL where it's displayed. We'll verify the link and add the Verified Provider badge to your listing within 24 hours.

---

**Questions?** Just reply to this email and we'll help you out.

Thanks for being part of Potty Directory!

Best,
Potty Directory Team
info@pottydirectory.com

---

## Template Notes

- Replace `[BUSINESS NAME]` with the vendor's business name from their form submission
- The badge image is hosted at `https://pottydirectory.com/verified-large.png`
- After they confirm the backlink is live, run the SQL to set `verified = true` for their listing
