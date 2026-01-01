# 🚀 Vercel Environment Variables Setup

## CRITICAL: Set these in Vercel Dashboard

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

### 🔥 FIREBASE CONFIGURATION (REQUIRED)
```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyDkHABSe2VvIeFeGK10BKyrzIZdZ7tPdvg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = gharbazaar-d70e5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = gharbazaar-d70e5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = gharbazaar-d70e5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 698490529242
NEXT_PUBLIC_FIREBASE_APP_ID = 1:698490529242:web:5bb4df57b92458dabb0ce3
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = G-YP4X1CDGLV
```

### 🌐 API CONFIGURATION
```
NEXT_PUBLIC_API_URL = https://api.gharbazaar.in
NEXT_PUBLIC_APP_URL = https://gharbazaar-launch.vercel.app
```

### 💳 PAYMENT GATEWAY
```
NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_live_RvkjkrUyApdteI
```

### 🔧 ADDITIONAL SETTINGS
```
NODE_ENV = production
NEXT_PUBLIC_ENABLE_ANALYTICS = true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS = true
NEXT_PUBLIC_ENABLE_CHAT = true
```

## 📋 Steps to Add in Vercel:

1. **Go to Vercel Dashboard**
2. **Select your project** (gharbazaar-launch)
3. **Click Settings tab**
4. **Click Environment Variables**
5. **Add each variable above** (one by one)
6. **Set Environment to: Production, Preview, Development**
7. **Click Save**
8. **Redeploy your project**

## 🔄 After Adding Variables:

1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Wait for build to complete
4. Test your live site

## ✅ Verification:

Your site should now work exactly like localhost with:
- ✅ Firebase authentication working
- ✅ All colors and styling perfect
- ✅ Images loading properly
- ✅ All functionality working

## 🆘 If Still Issues:

Check browser console for errors and let me know!