#!/bin/bash


OUTFILE="temp.txt"

#echo -e ${1} > ${OUTFILE}
printf '%s' "${1}" > ${OUTFILE}
lp ${OUTFILE}
#rm ${OUTFILE}
