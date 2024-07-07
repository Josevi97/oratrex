#!/bin/sh

cd backend
npm start &
cd ../frontend
npm run dev &
cd ..
