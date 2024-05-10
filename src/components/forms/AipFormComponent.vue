<script lang="ts">
import { defineComponent } from 'vue'
import type { Character } from '@/types/character'
import type { Aip } from '@/types/aip'
import type { AipSession } from '@/types/aipSession'
import { Challenge } from '@/types/enums/challenge'
import type { Hunt } from '@/types/hunt'
import { HuntType } from '@/types/enums/huntType'
import type { Expenditure } from '@/types/expenditure'
import type { VampireAction } from '@/types/vampireAction'

export default defineComponent({
  name: 'AipFormComponent',
  emits: ['close', 'saveAip', 'addExpenditure', 'addVampireAction'],
  computed: {
    HuntType() {
      return HuntType
    },
    Challenge() {
      return Challenge
    }
  },
  props: {
    aip: {
      type: Object as () => Aip,
      required: true
    },
    aipSession: {
      type: Object as () => AipSession,
      required: true
    },
    character: {
      type: Object as () => Character,
      required: true
    },
    isStoryTeller: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      challengesAttributes: {
        isValid: true,
        challengesType: '',
        challengesMessage: ''
      },
      challenges: [] as Challenge[],
      huntsAttributes: {
        isTypeValid: false,
        isDescriptionValid: false,
        huntsTypeType: '',
        huntsTypeMessage: '',
        descriptionType: '',
        descriptionMessage: ''
      },
      hunts: [
        {
          type: '' as HuntType,
          description: ''
        } as Hunt
      ] as Hunt[],
      expendituresAttributes: {
        isValid: false,
        expendituresType: '',
        expendituresMessage: ''
      },
      expenditures: [] as Expenditure[],
      vampireActionsAttributes: {
        isValid: false,
        vampireActionsType: '',
        vampireActionsMessage: ''
      },
      vampireActions: [] as VampireAction[]
    }
  },
  methods: {
    save() {
      this.checkChallenges()
      this.checkHunts()
      this.checkVampireActions()
      if (
        this.challengesAttributes.isValid &&
        this.huntsAttributes.isTypeValid &&
        this.huntsAttributes.isDescriptionValid &&
        this.vampireActionsAttributes.isValid
      ) {
        this.$emit('saveAip', this.aip)
        this.$emit('close')
      }
    },
    checkChallenges() {
      this.challengesAttributes.isValid = this.aip.challenges.length === 10
      this.challengesAttributes.challengesType = this.challengesAttributes.isValid
        ? 'is-success'
        : 'is-danger'
      this.challengesAttributes.challengesMessage = this.challengesAttributes.isValid
        ? ''
        : 'Il faut 10 challenges'
    },
    checkHunts() {
      this.huntsAttributes.isTypeValid =
        (this.aip.hunts[0].type == HuntType.AIP && this.aip.vampireActions.length > 0) ||
        this.aip.hunts[0].type == HuntType.TROUPEAU
      this.huntsAttributes.isDescriptionValid = this.aip.hunts[0].description !== ''
      this.huntsAttributes.huntsTypeType = this.huntsAttributes.isTypeValid
        ? 'is-success'
        : 'is-danger'
      this.huntsAttributes.huntsTypeMessage =
        this.aip.hunts[0].type != HuntType.AIP && this.aip.hunts[0].type != HuntType.TROUPEAU
          ? 'Il faut un type de chasse'
          : this.aip.hunts[0].type == HuntType.AIP && this.aip.vampireActions.length < 1
            ? 'Il faut une action vampirique "Chasse"'
            : ''
      this.huntsAttributes.descriptionType = this.huntsAttributes.isDescriptionValid
        ? 'is-success'
        : 'is-danger'
      this.huntsAttributes.descriptionMessage = this.huntsAttributes.isDescriptionValid
        ? ''
        : 'Il faut une description'
    },
    checkVampireActions() {
      this.vampireActionsAttributes.isValid =
        this.aip.hunts[0]?.type == HuntType.AIP
          ? this.aip.vampireActions.map((vampireAction) => vampireAction.title).indexOf('Chasse') >
            -1
          : true

      this.vampireActionsAttributes.vampireActionsType = this.vampireActionsAttributes.isValid
        ? 'is-succes'
        : 'is-danger'

      this.vampireActionsAttributes.vampireActionsMessage = this.vampireActionsAttributes.isValid
        ? ''
        : 'Il faut une action vampirique "Chasse"'
    },
    addExpenditure() {
      this.$emit('addExpenditure')
    },
    removeExpenditure(index: number) {
      this.aip.expenditures.splice(index, 1)
    },
    addVampireAction() {
      this.$emit('addVampireAction')
    },
    removeVampireAction(index: number) {
      this.aip.vampireActions.splice(index, 1)
    },
    isDisabledForPlayer() {
      return this.isStoryTeller
    },
    isDisabledForStoryTeller() {
      return !this.isStoryTeller
    }
  }
})
</script>

<template>
  <form>
    <div class="modal-card">
      <header class="modal-card-head">
        <p>
          AIP {{ aipSession.name }} ({{ aipSession.beginDate.toLocaleDateString() }} -
          {{ aipSession.endDate.toLocaleDateString() }}) : <strong>{{ character.name }}</strong> ({{
            character.clan
          }})
        </p>
      </header>
      <section class="modal-card-body">
        <div class="modal-card-body__section">
          <h1><b-icon icon="dice-multiple" />Etape 1 : Les challenges</h1>

          <b-field
            label="Challenges"
            :type="challengesAttributes.challengesType"
            :message="challengesAttributes.challengesMessage"
          >
            <div class="challenges">
              <div class="challenges__row">
                <b-select
                  v-for="n in 3"
                  v-model="aip.challenges[n - 1]"
                  placeholder="Choisis un challenge"
                  :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
                >
                  <option v-for="challenge in Challenge" :key="challenge">{{ challenge }}</option>
                </b-select>
              </div>
              <div class="challenges__row">
                <b-select
                  v-for="n in 3"
                  v-model="aip.challenges[n + 2]"
                  placeholder="Choisis un challenge"
                  :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
                >
                  <option v-for="challenge in Challenge" :key="challenge">{{ challenge }}</option>
                </b-select>
              </div>
              <div class="challenges__row">
                <b-select
                  v-for="n in 3"
                  v-model="aip.challenges[n + 5]"
                  placeholder="Choisis un challenge"
                  :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
                >
                  <option v-for="challenge in Challenge" :key="challenge">{{ challenge }}</option>
                </b-select>
              </div>
              <div class="challenges__row">
                <b-select
                  v-model="aip.challenges[9]"
                  placeholder="Choisis un challenge"
                  :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
                >
                  <option v-for="challenge in Challenge" :key="challenge">{{ challenge }}</option>
                </b-select>
              </div>
            </div>
          </b-field>
        </div>

        <div class="modal-card-body__section">
          <h1><b-icon icon="silverware-fork-knife" />Etape 2 : La chasse</h1>
          <b-field
            label="Type de chasse"
            :type="huntsAttributes.huntsTypeType"
            :message="huntsAttributes.huntsTypeMessage"
          >
            <b-select
              v-model="aip.hunts[0].type"
              placeHolder="Choisis un type de chasse"
              :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
            >
              <option v-for="huntType in HuntType" :key="huntType">{{ huntType }}</option>
            </b-select>
          </b-field>
          <b-field
            label="Description"
            :type="huntsAttributes.descriptionType"
            :message="huntsAttributes.descriptionMessage"
          >
            <b-input
              v-model="aip.hunts[0].description"
              :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
              type="text"
            />
          </b-field>
        </div>

        <div class="modal-card-body__section">
          <h1><b-icon icon="cash-multiple" />Etape 3 : Les dépenses</h1>
          <div v-for="(expenditure, index) in aip.expenditures">
            <b-field label="Montant">
              <b-input
                v-model="expenditure.sum"
                type="number"
                :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
              />
            </b-field>
            <b-field label="Description">
              <b-input
                v-model="expenditure.reason"
                type="text"
                :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
              />
            </b-field>

            <b-field
              v-if="(isStoryTeller && aip.isClosed) || (!isStoryTeller && aip.isRendered)"
              label="Réponse des conteurs"
            >
              <b-input
                v-model="expenditure.response"
                type="textarea"
                aria-placeholder="Réponse des conteurs"
                :disabled="aip.isRendered"
              />
            </b-field>

            <b-button
              v-if="(!isStoryTeller && !aip.isClosed) || isStoryTeller"
              @click="removeExpenditure(index)"
              rounded
              type="is-primary"
              :disabled="isStoryTeller"
            >
              <b-icon icon="delete"></b-icon>
            </b-button>
          </div>
          <b-button
            v-if="(!isStoryTeller && !aip.isClosed) || isStoryTeller"
            @click="addExpenditure"
            rounded
            type="is-primary"
          >
            <b-icon icon="plus"></b-icon>
          </b-button>
        </div>

        <div class="modal-card-body__section">
          <h1><b-icon icon="bat" /> Etape 4 : Les actions vampiriques</h1>
          <div v-for="(vampireAction, index) in aip.vampireActions">
            <h2>
              <strong>Action vampirique n°{{ index + 1 }}</strong>
            </h2>
            <b-field
              label="titre"
              :type="vampireActionsAttributes.vampireActionsType"
              :message="vampireActionsAttributes.vampireActionsMessage"
            >
              <b-input
                v-model="vampireAction.title"
                type="text"
                aria-placeholder="titre"
                :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
              />
            </b-field>
            <b-field label="description">
              <b-input
                v-model="vampireAction.description"
                type="textarea"
                aria-placeholder="description"
                :disabled="isStoryTeller || (!isStoryTeller && aip.isClosed)"
              />
            </b-field>
            <b-field
              v-if="(isStoryTeller && aip.isClosed) || (!isStoryTeller && aip.isRendered)"
              label="Réponse des conteurs"
            >
              <b-input
                v-model="vampireAction.response"
                type="textarea"
                aria-placeholder="Réponse des conteurs"
                :disabled="aip.isRendered"
              />
            </b-field>
            <b-field
              v-if="aip.isClosed && isStoryTeller"
              label="Notes pour les Conteurs, non visibles par les joueurs"
            >
              <b-input v-model="vampireAction.notes" type="textarea" aria-placeholder="Notes" />
            </b-field>
            <b-button
              @click="removeVampireAction(index)"
              rounded
              type="is-primary"
              v-if="(!isStoryTeller && !aip.isClosed) || isStoryTeller"
            >
              <b-icon icon="delete"></b-icon>
            </b-button>
          </div>
          <b-button
            v-if="(!isStoryTeller && !aip.isClosed) || isStoryTeller"
            @click="addVampireAction"
            rounded
            type="is-primary"
          >
            <b-icon icon="plus"></b-icon>
          </b-button>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Fermer" @click="$emit('close')" />
        <b-button
          v-if="
            (isStoryTeller && aip.isClosed && !aip.isRendered) || (!isStoryTeller && !aip.isClosed)
          "
          label="Sauver"
          type="is-primary"
          @click="save()"
        />
      </footer>
    </div>
  </form>
</template>

<style scoped lang="scss">
h1 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  padding: 0.2rem;
  background-color: #9fcdff;
  border-radius: 5px;
}

.modal-card {
  width: 800px;
}

.modal-card-body {
  &__section {
    margin-bottom: 1rem;
    border-top: 1px solid black;
  }
}

.challenges {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
