<script setup lang="ts">
const { doCreateProfile, doCollectBadge, createProfileForm, doRegisterEssence, doGetPrimaryProfile, doSubscribeToProfileGasless } = $(ccStore())

const route = useRoute()
const address = $computed(() => route.params.address)

</script>
<template>
  <div class="h-full mx-auto w-full max-w-7xl p-5">
    <section aria-labelledby="notes-title">
      <div class="">
        <div>
          <h2>Gas required</h2>
          <div>
            <h3>Create Profile</h3>
            <input v-model="createProfileForm.handle" type="text" name="handle">
            <BtnIndigo @click="doCreateProfile">
              1. doCreateProfile
            </BtnIndigo>
          </div>
          <div>
            <h3>Get Profile</h3>
            {{ createProfileForm }}
            <BtnIndigo @click="doGetPrimaryProfile">
              2. doGetPrimaryProfile
            </BtnIndigo>
          </div>
          <div>
            <h3>Register Essence</h3>
            <BtnIndigo @click="doRegisterEssence">
              3. doRegisterEssence
            </BtnIndigo>
            <BtnIndigo @click="doCollectBadge">
              4. Collect Badge
            </BtnIndigo>
          </div>
        </div>
        <div>
          <h2>Subscribe</h2>
          <div>
            <h3>doSubscribeToProfileGasless</h3>
            <BtnIndigo @click="doSubscribeToProfileGasless">
              doSubscribeToProfileGasless
            </BtnIndigo>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
