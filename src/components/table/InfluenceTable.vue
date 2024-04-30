<template>
  <b-field label="Influences">
    <b-button rounded type="is-primary" @click="openNewInfluence()">
      <b-icon icon="plus"></b-icon>
    </b-button>
    <b-table :data="influences as Influence[]">
      <b-table-column field="id" label="id" v-slot="props">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column field="name" label="nom" v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column field="category" label="catégorie" v-slot="props">
        {{ props.row.category }}
      </b-table-column>
      <b-table-column field="specialty" label="spécialité" v-slot="props">
        {{ props.row.specialty }}
      </b-table-column>
      <b-table-column field="level" label="niveau" numeric v-slot="props">
        {{ props.row.level }}
      </b-table-column>
      <b-table-column fiels="district" label="district" v-slot="props">
        {{ props.row.district }}
      </b-table-column>
      <b-table-column field="actions" label="actions" v-slot="props">
        <div class="buttons">
          <b-button @click="openEditInfluence(props.row)">
            <b-icon icon="pencil"></b-icon>
          </b-button>
          <b-button @click="confirmDeleteInfluence(props.row)">
            <b-icon icon="delete" type="is-danger"></b-icon>
          </b-button>
        </div>
      </b-table-column>
    </b-table>
  </b-field>
  <b-modal
    v-model="influenceAttributes.isInfluenceModalOpen"
    has-modal-card
    :destroy-on-hide="true"
  >
    <template #default="props">
      <InfluenceFormComponent
        @close="props.close()"
        @addInfluence="addInfluence"
        @editInfluence="editInfluence"
        :influence="influenceAttributes.influenceProps"
      />
    </template>
  </b-modal>
</template>

<script lang="ts">
import InfluenceFormComponent from '@/components/forms/InfluenceFormComponent.vue'
import { type Influence } from '@/types/influence'
import { Category } from '@/types/enums/category'
import { Specialty } from '@/types/enums/specialty'
import { defineComponent } from 'vue'
import { District } from '@/types/enums/district'

export default defineComponent({
  name: 'InfluenceTable',
  emits: ['addInfluence', 'editInfluence', 'deleteInfluence'],
  components: { InfluenceFormComponent },
  props: {
    influences: {
      type: Array as () => Influence[],
      required: true
    }
  },
  data() {
    return {
      influenceAttributes: {
        isInfluenceModalOpen: false,
        influenceProps: {
          name: '',
          category: Category[Symbol.hasInstance],
          specialty: Specialty[Symbol.hasInstance],
          level: 0,
          district: 'LILLE'
        } as Influence
      } as any
    }
  },
  methods: {
    openNewInfluence(): void {
      this.influenceAttributes.influenceProps.name = ''
      this.influenceAttributes.influenceProps.category = Category[Symbol.hasInstance]
      this.influenceAttributes.influenceProps.specialty = Specialty[Symbol.hasInstance]
      this.influenceAttributes.influenceProps.level = 0
      this.influenceAttributes.influenceProps.district = District.LILLE
      this.influenceAttributes.isInfluenceModalOpen = true
    },

    openEditInfluence(influenceToEdit: Influence): void {
      this.influenceAttributes.influenceProps = { ...influenceToEdit } as Influence
      this.influenceAttributes.isInfluenceModalOpen = true
    },

    addInfluence(influence: Influence): void {
      this.$emit('addInfluence', influence)
      //this.formData.influences.push(influence)
    },
    editInfluence(influence: Influence) {
      this.$emit('editInfluence', influence)
    },
    confirmDeleteInfluence(influence: Influence) {
      this.$buefy.dialog.confirm({
        title: 'Supprimer un personnage',
        message:
          "Etes-vous sûr de vouloir <b>supprimer</b> l'influence suivante ? Cette action est irréversible. " +
          '<br>' +
          '<br> nom: ' +
          '<b>' +
          influence.name +
          '</b>' +
          '<br> spécialité: ' +
          '<b>' +
          influence.specialty +
          '</b>' +
          '<br> catégorie: ' +
          '<b>' +
          influence.category +
          '</b>',

        confirmText: 'Supprimer',
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteInfluence(influence)
          this.$buefy.toast.open('Influence supprimée!')
        }
      })
    },
    deleteInfluence(influence: Influence) {
      this.$emit('deleteInfluence', influence)
    }
  }
})
</script>
