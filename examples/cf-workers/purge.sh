#!/bin/bash

list=$(wrangler kv:key list --binding IMAGE_KV | jq '.[] | .name' | sed 's/"//g')

for value in $list
do
    echo $value
    wrangler kv:key delete --binding IMAGE_KV $value --force
done
