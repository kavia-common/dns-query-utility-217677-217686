#!/bin/bash
cd /home/kavia/workspace/code-generation/dns-query-utility-217677-217686/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

