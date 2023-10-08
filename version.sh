
#!/bin/bash

# Read the current version code from build.gradle
increment_num=0.1
current_version_code=$(grep -o "versionName\s\+.*" android/app/build.gradle | awk '{ print $2 }' | tr -d \''"\')

# Increment the version code


# Update the build.gradle file with the new version code
new_version_code=$(echo $increment_num+$current_version_code | bc -l)
# sed -i.bak "s/versionName $current_version_code/versionName $new_version_code/" android/app/build.gradle
sed -i '' "s/versionName \"$current_version_code\"/versionName \"$new_version_code\"/" android/app/build.gradle
echo "Version code incremented to $new_version_code"
