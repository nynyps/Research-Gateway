import React, { useState, useEffect, useCallback } from 'react';
import { 
  PlusCircle, 
  Layers, 
  User, 
  CheckCircle2, 
  Clock, 
  Check, 
  HelpCircle, 
  Eye, 
  ShieldCheck, 
  Radio, 
  Activity, 
  Waves, 
  Search, 
  AlertCircle, 
  X, 
  ChevronRight, 
  Building, 
  Calendar, 
  MessageSquare,
  FileText,
  TrendingUp,
  Inbox,
  Sparkles,
  Info,
  Paperclip,
  Edit3,
  Download,
  Mail,
  Lock,
  LogOut,
  Archive
} from 'lucide-react';
import { supabase } from './supabaseClient';

// Modalities list
const MODALITIES = [
  'IRM', 
  'CT',
  'Échographie', 
  'Monitorage', 
  'Image-Guided Therapy', 
  'Autre'
];

// Business Units list
const BUSINESS_UNITS = [
  'IRM', 
  'CT', 
  'Monitoring', 
  'IGT', 
  'CI'
];

const LANGUAGE_LABELS = {
  fr: 'FR',
  en: 'EN'
};

const COPY = {
  fr: {
    loadingPortal: 'Chargement du portail Philips...',
    portalSubtitle: "Co-construire la médecine de demain en connectant praticiens cliniques et équipes de recherche et d'innovation Philips.",
    simpleSubmission: 'Soumission simplifiée',
    simpleSubmissionCopy: 'Décrivez vos concepts cliniques et importez vos études.',
    liveTracking: 'Suivi en direct',
    liveTrackingCopy: "Suivez l'avancement via notre timeline à chaque étape.",
    directFeedback: 'Feedback direct',
    directFeedbackCopy: 'Échangez avec les experts R&D de Philips.',
    versionLabel: 'Version MVP 1.1.0 • Philips HealthTech',
    portalConnection: 'Connexion Portail',
    supabaseRequired: 'Service en ligne requis',
    signIn: 'Se connecter',
    createAccount: 'Créer un compte',
    welcomeBack: 'Bienvenue à nouveau',
    joinGateway: 'Rejoindre le Gateway',
    loginIntro: "Connectez-vous pour suivre ou soumettre des projets de recherche et d'innovation cliniques.",
    signupIntro: 'Créez un compte, puis utilisez-le directement pour vous connecter.',
    supabaseConfigWarning: 'Le service en ligne doit être configuré pour utiliser le portail. Les comptes, idées, statuts, feedbacks et pièces jointes doivent rester synchronisés entre ordinateurs.',
    fullName: 'Nom Complet',
    accountType: 'Type de compte',
    userAccount: 'Utilisateur',
    adminAccount: 'Gestionnaire',
    hospitalInstitution: 'Hôpital / Institution',
    emailAddress: 'Adresse Email',
    password: 'Mot de passe',
    createAccess: "Créer l'accès",
    practitionerSpace: 'Espace Praticien',
    greeting: 'Bonjour',
    practitionerFallback: 'Praticien',
    practitionerWelcome: "Bienvenue sur le portail de recherche et d'innovation clinique Philips de l'",
    practitionerWelcomeSuffix: ". Soumettez vos idées de dispositifs et solutions numériques pour co-construire la médecine de demain avec nos ingénieurs.",
    yourInstitution: 'votre établissement',
    submitIdea: 'Soumettre une idée',
    describeConcept: 'Décrivez votre concept clinique',
    ideaTitle: "Titre de l'idée",
    modalityPhilips: 'Modalité Philips (Imagerie)',
    selectModality: 'Sélectionner une modalité',
    clinicalProblem: 'Problème clinique constaté',
    proposedSolution: 'Solution proposée',
    attachmentsLabel: 'Pièces jointes (Articles scientifiques, images, études)',
    clickToAdd: 'Cliquez pour ajouter',
    dragDrop: 'ou glissez-déposez',
    submitIdeaButton: "Soumettre l'idée",
    submittedIdeas: 'Mes idées soumises',
    archivedIdeas: 'Idées archivées',
    archivedIdeasList: 'Liste des idées déjà archivées',
    proposalTracking: 'Suivi de vos propositions',
    noArchivedIdeas: 'Aucune idée archivée pour le moment.',
    noSubmittedIdeas: "Vous n'avez pas encore soumis d'idée.",
    ideaSingular: 'Idée',
    ideaPluralSuffix: 's',
    edit: 'Modifier',
    archive: 'Archiver',
    fileAttachments: 'Fichiers joints (cliquez pour télécharger) :',
    progress: 'Avancement du dossier',
    noFeedbackYet: "Aucun feedback pour le moment. Votre dossier est en cours d'évaluation.",
    managerSpace: 'Espace Gestionnaire',
    dashboard: 'Tableau de Bord',
    totalIdeas: 'Total Idées',
    inEvaluation: 'En évaluation',
    approvedPlural: 'Approuvées',
    searchPlaceholder: 'Rechercher par médecin, mot-clé, feedback...',
    buFilter: 'Filtre BU :',
    allBus: 'Toutes les BUs',
    unassigned: 'Non assignée',
    all: 'Tous',
    noIdeaMatches: 'Aucune idée ne correspond à votre recherche.',
    attachmentCount: 'pièce(s) jointe(s)',
    buUnassigned: 'BU non assignée',
    submitterDoctor: 'Médecin soumissionnaire',
    editModeOrchestrator: 'Mode Édition - Gestionnaire',
    editModePI: 'Modifier mon idée',
    updateSuccess: 'Mise à jour réussie.',
    ideaTitleEditable: "Titre de l'idée (Modifiable)",
    clinicalModality: 'Modalité clinique',
    selectBU: 'Sélectionner BU',
    projectStatus: 'Statut du projet',
    clinicalProblemEditable: 'Problème clinique constaté (Modifiable)',
    proposedSolutionEditable: 'Solution technologique proposée (Modifiable)',
    doctorAttachments: 'Pièces jointes par le médecin (cliquez pour télécharger) :',
    feedbackVisible: 'Feedback Interne / Externe (Visible par le PI)',
    feedbackPlaceholder: "Écrivez vos commentaires sur la faisabilité, les étapes de chiffrage ou la décision finale...",
    internalWorkNotes: 'Notes de travail internes',
    caseManagement: 'Gestion du dossier',
    triageNotes: 'Notes de Tri',
    triageDescription: 'Lecture de la soumission PI et qualification initiale.',
    piSubmission: 'Soumission du PI',
    piSubmissionHelp: 'Données transmises par le PI, non modifiées dans le panneau admin.',
    businessUnitAssignment: 'Assignation Business Unit',
    scientificEvaluation: 'Évaluation Scientifique',
    scientificEvaluationDescription: 'Avis clinique et points de vigilance internes.',
    clinicalRelevance: 'Pertinence Clinique',
    clinicalScientistComments: 'Commentaires du Clinical Scientist',
    ipAlert: 'Alerte Propriété Intellectuelle',
    ipAlertComment: "Commentaire sur l'alerte PI",
    resourceSizing: 'Chiffrage',
    resourceSizingDescription: 'Estimation des moyens nécessaires.',
    estimatedBudget: 'Budget Estimé (€)',
    resourcesFte: 'Ressources nécessaires (FTE)',
    resourceSizingComments: 'Commentaires de chiffrage',
    arbitration: 'Arbitrage',
    arbitrationDescription: 'Lecture stratégique et financement.',
    roadmapFit: 'Adéquation Roadmap',
    fundingSource: 'Source de Financement',
    arbitrationComments: "Commentaires d'arbitrage",
    finalizedCase: 'Dossier finalisé',
    finalizedCaseBody: "Aucun champ interne supplémentaire n'est requis pour ce statut.",
    officialPiMessage: 'Message officiel pour le PI',
    officialPiMessageHelp: 'Ce champ alimente le feedback affiché dans le tableau du PI.',
    officialPiWarning: '⚠️ Ce message sera visible par le PI sur son tableau de bord.',
    saveInternalData: 'Mettre à jour les données internes',
    advanceFunnel: "Passer à l'étape suivante du Funnel",
    currentCaseStatus: 'Statut courant du dossier',
    viewedWorkflowStep: 'Étape consultée',
    viewedWorkflowStepHelp: 'Consultez ou complétez les données de chaque phase sans changer le statut courant.',
    update: 'Mettre à jour',
    close: 'Fermer',
    saveChanges: 'Enregistrer',
    footerSync: 'Version de démonstration 2026.',
    logoutTitle: 'Se déconnecter',
    titleRequired: 'Veuillez saisir un titre.',
    modalityRequired: 'Veuillez sélectionner une modalité Philips.',
    problemTooLong: 'Le problème clinique dépasse 1500 caractères.',
    solutionTooLong: 'La solution proposée dépasse 1500 caractères.',
    ideaSaved: 'Votre idée a été enregistrée en ligne !',
    ideaSaveError: "Erreur de sauvegarde en ligne.",
    ideaNotSavedNoSupabase: "Le service en ligne n'est pas configuré. L'idée n'a pas été enregistrée.",
    loginSuccess: 'Connexion réussie !',
    loginInvalid: 'Connexion impossible : email ou mot de passe incorrect.',
    loginError: 'Connexion impossible. Vérifiez vos identifiants.',
    supabaseLoginMissing: "Le service en ligne n'est pas configuré. Les données doivent être stockées en ligne pour les tests multi-postes.",
    signupSuccess: 'Compte créé, connexion en cours...',
    signupConfirmEmail: "Compte créé. Si la connexion n'est pas automatique, désactivez la confirmation email dans la configuration du portail.",
    signupError: "Erreur lors de l'inscription.",
    signupMissingSupabase: "Le service en ligne n'est pas configuré. Création de compte impossible sans synchronisation cloud.",
    logoutSuccess: 'Déconnexion réussie.',
    syncIdeasError: 'Impossible de synchroniser les idées.',
    filesAttached: 'fichier(s) joint(s) avec succès.',
    downloadStarted: 'Téléchargement de',
    downloadStartedSuffix: 'démarré.',
    updateTitleRequired: 'Le titre ne peut pas être vide.',
    updateSaved: 'Mise à jour enregistrée en ligne !',
    updateError: 'Erreur de mise à jour en ligne.',
    archiveConfirmTitle: 'Archiver cette idée ?',
    archiveConfirmBody: 'Elle restera consultable dans vos idées archivées.',
    cancel: 'Annuler',
    confirmArchive: 'Archiver',
    activeIdeas: 'Idées actives',
    ideaArchived: 'Idée archivée.',
    ideaUpdated: 'Idée mise à jour.',
    chars: 'car.',
    roleOrchestrator: 'Gestionnaire',
    rolePI: 'PI',
    unspecified: 'Non spécifié',
    anonymousDoctor: 'Dr. Anonyme',
    unknownHospital: 'Hôpital non renseigné',
    titlePlaceholder: "ex: Système d'alignement guidé par IA...",
    problemPlaceholder: 'Décrivez la difficulté clinique rencontrée (max 1500 caractères)...',
    solutionPlaceholder: 'Comment améliorer ou résoudre ce problème techniquement (max 1500 caractères)...',
    mockFileIntro: 'Ce fichier est une démonstration du MVP Philips Clinical Research & Innovation Gateway.',
    mockFileServer: 'Dans la version de production, le vrai document serait téléchargé depuis le serveur.'
  },
  en: {
    loadingPortal: 'Loading Philips portal...',
    portalSubtitle: 'Co-build tomorrow’s medicine by connecting clinical practitioners with Philips research and innovation teams.',
    simpleSubmission: 'Simple submission',
    simpleSubmissionCopy: 'Describe clinical concepts and upload supporting studies.',
    liveTracking: 'Live tracking',
    liveTrackingCopy: 'Track progress through the timeline at every step.',
    directFeedback: 'Direct feedback',
    directFeedbackCopy: 'Exchange with Philips R&D experts.',
    versionLabel: 'MVP 1.1.0 • Philips HealthTech',
    portalConnection: 'Portal connection',
    supabaseRequired: 'Online service required',
    signIn: 'Sign in',
    createAccount: 'Create account',
    welcomeBack: 'Welcome back',
    joinGateway: 'Join the Gateway',
    loginIntro: 'Sign in to track or submit clinical research and innovation projects.',
    signupIntro: 'Create an account, then use it directly to sign in.',
    supabaseConfigWarning: 'The online service must be configured to use the portal. Accounts, ideas, statuses, feedback, and attachments must stay synchronized across computers.',
    fullName: 'Full name',
    accountType: 'Account type',
    userAccount: 'User',
    adminAccount: 'Manager',
    hospitalInstitution: 'Hospital / Institution',
    emailAddress: 'Email address',
    password: 'Password',
    createAccess: 'Create access',
    practitionerSpace: 'Practitioner Space',
    greeting: 'Hello',
    practitionerFallback: 'Practitioner',
    practitionerWelcome: 'Welcome to the Philips clinical research and innovation portal for ',
    practitionerWelcomeSuffix: '. Submit medical device and digital solution ideas to co-build tomorrow’s medicine with our engineers.',
    yourInstitution: 'your institution',
    submitIdea: 'Submit an idea',
    describeConcept: 'Describe your clinical concept',
    ideaTitle: 'Idea title',
    modalityPhilips: 'Philips modality (Imaging)',
    selectModality: 'Select a modality',
    clinicalProblem: 'Observed clinical problem',
    proposedSolution: 'Proposed solution',
    attachmentsLabel: 'Attachments (Scientific articles, images, studies)',
    clickToAdd: 'Click to add',
    dragDrop: 'or drag and drop',
    submitIdeaButton: 'Submit idea',
    submittedIdeas: 'My submitted ideas',
    archivedIdeas: 'Archived ideas',
    archivedIdeasList: 'List of archived ideas',
    proposalTracking: 'Proposal tracking',
    noArchivedIdeas: 'No archived ideas yet.',
    noSubmittedIdeas: 'You have not submitted any ideas yet.',
    ideaSingular: 'Idea',
    ideaPluralSuffix: 's',
    edit: 'Edit',
    archive: 'Archive',
    fileAttachments: 'Attached files (click to download):',
    progress: 'Case progress',
    noFeedbackYet: 'No feedback yet. Your case is being reviewed.',
    managerSpace: 'Manager Space',
    dashboard: 'Dashboard',
    totalIdeas: 'Total ideas',
    inEvaluation: 'In evaluation',
    approvedPlural: 'Approved',
    searchPlaceholder: 'Search by physician, keyword, feedback...',
    buFilter: 'BU filter:',
    allBus: 'All BUs',
    unassigned: 'Unassigned',
    all: 'All',
    noIdeaMatches: 'No idea matches your search.',
    attachmentCount: 'attachment(s)',
    buUnassigned: 'BU unassigned',
    submitterDoctor: 'Submitting physician',
    editModeOrchestrator: 'Edit Mode - Manager',
    editModePI: 'Edit my idea',
    updateSuccess: 'Update successful.',
    ideaTitleEditable: 'Idea title (Editable)',
    clinicalModality: 'Clinical modality',
    selectBU: 'Select BU',
    projectStatus: 'Project status',
    clinicalProblemEditable: 'Observed clinical problem (Editable)',
    proposedSolutionEditable: 'Proposed technical solution (Editable)',
    doctorAttachments: 'Files attached by the physician (click to download):',
    feedbackVisible: 'Internal / External feedback (Visible to the PI)',
    feedbackPlaceholder: 'Write comments on feasibility, resource sizing steps, or the final decision...',
    internalWorkNotes: 'Internal work notes',
    caseManagement: 'Case management',
    triageNotes: 'Triage Notes',
    triageDescription: 'PI submission review and initial qualification.',
    piSubmission: 'PI submission',
    piSubmissionHelp: 'Data submitted by the PI, not edited from the admin drawer.',
    businessUnitAssignment: 'Business Unit assignment',
    scientificEvaluation: 'Scientific Evaluation',
    scientificEvaluationDescription: 'Clinical opinion and internal watch points.',
    clinicalRelevance: 'Clinical Relevance',
    clinicalScientistComments: 'Clinical Scientist Comments',
    ipAlert: 'Intellectual Property Alert',
    ipAlertComment: 'IP alert comment',
    resourceSizing: 'Resource Sizing',
    resourceSizingDescription: 'Estimated resources required.',
    estimatedBudget: 'Estimated Budget (€)',
    resourcesFte: 'Required resources (FTE)',
    resourceSizingComments: 'Resource sizing comments',
    arbitration: 'Arbitration',
    arbitrationDescription: 'Strategic fit and funding review.',
    roadmapFit: 'Roadmap Fit',
    fundingSource: 'Funding Source',
    arbitrationComments: 'Arbitration comments',
    finalizedCase: 'Finalized case',
    finalizedCaseBody: 'No additional internal field is required for this status.',
    officialPiMessage: 'Official message for the PI',
    officialPiMessageHelp: 'This field updates the feedback shown in the PI dashboard.',
    officialPiWarning: '⚠️ This message will be visible to the PI on their dashboard.',
    saveInternalData: 'Update internal data',
    advanceFunnel: 'Move to the next funnel step',
    currentCaseStatus: 'Current case status',
    viewedWorkflowStep: 'Viewed step',
    viewedWorkflowStepHelp: 'Review or complete each phase without changing the current status.',
    update: 'Update',
    close: 'Close',
    saveChanges: 'Save changes',
    footerSync: 'Demo version 2026.',
    logoutTitle: 'Sign out',
    titleRequired: 'Please enter a title.',
    modalityRequired: 'Please select a Philips modality.',
    problemTooLong: 'The clinical problem exceeds 1500 characters.',
    solutionTooLong: 'The proposed solution exceeds 1500 characters.',
    ideaSaved: 'Your idea was saved online!',
    ideaSaveError: 'Online save error.',
    ideaNotSavedNoSupabase: 'The online service is not configured. The idea was not saved.',
    loginSuccess: 'Signed in successfully!',
    loginInvalid: 'Sign-in failed: email or password is incorrect.',
    loginError: 'Sign-in failed. Check your credentials.',
    supabaseLoginMissing: 'The online service is not configured. Data must be stored online for multi-computer testing.',
    signupSuccess: 'Account created, signing in...',
    signupConfirmEmail: 'Account created. If sign-in is not automatic, disable email confirmation in the portal configuration.',
    signupError: 'Sign-up error.',
    signupMissingSupabase: 'The online service is not configured. Account creation is unavailable without cloud sync.',
    logoutSuccess: 'Signed out.',
    syncIdeasError: 'Unable to sync ideas.',
    filesAttached: 'file(s) attached successfully.',
    downloadStarted: 'Download of',
    downloadStartedSuffix: 'started.',
    updateTitleRequired: 'Title cannot be empty.',
    updateSaved: 'Update saved online!',
    updateError: 'Online update error.',
    archiveConfirmTitle: 'Archive this idea?',
    archiveConfirmBody: 'It will remain available in your archived ideas.',
    cancel: 'Cancel',
    confirmArchive: 'Archive',
    activeIdeas: 'Active ideas',
    ideaArchived: 'Idea archived.',
    ideaUpdated: 'Idea updated.',
    chars: 'chars',
    roleOrchestrator: 'Manager',
    rolePI: 'PI',
    unspecified: 'Not specified',
    anonymousDoctor: 'Anonymous physician',
    unknownHospital: 'Hospital not provided',
    titlePlaceholder: 'e.g. AI-guided alignment system...',
    problemPlaceholder: 'Describe the clinical difficulty encountered (max 1500 characters)...',
    solutionPlaceholder: 'How could this problem be improved or solved technically (max 1500 characters)...',
    mockFileIntro: 'This file is a demo document from the Philips Clinical Research & Innovation Gateway MVP.',
    mockFileServer: 'In production, the real document would be downloaded from the server.'
  }
};

// Status list
const STATUSES = [
  'Soumis', 
  'En évaluation', 
  'Chiffrage Ressources', 
  'Arbitrage Philips', 
  'Approuvé', 
  'Archivé'
];

const STATUS_LABELS = {
  fr: {
    'Soumis': 'Soumis',
    'En évaluation': 'En évaluation',
    'Chiffrage Ressources': 'Chiffrage Ressources',
    'Arbitrage Philips': 'Arbitrage Philips',
    'Approuvé': 'Approuvé',
    'Archivé': 'Archivé'
  },
  en: {
    'Soumis': 'Submitted',
    'En évaluation': 'In evaluation',
    'Chiffrage Ressources': 'Resource sizing',
    'Arbitrage Philips': 'Philips arbitration',
    'Approuvé': 'Approved',
    'Archivé': 'Archived'
  }
};

const STATUS_SHORT_LABELS = {
  fr: {
    'Soumis': 'Soumis',
    'En évaluation': 'Éval.',
    'Chiffrage Ressources': 'Chiffr.',
    'Arbitrage Philips': 'Arbit.',
    'Approuvé': 'Approuvé'
  },
  en: {
    'Soumis': 'Subm.',
    'En évaluation': 'Eval.',
    'Chiffrage Ressources': 'Sizing',
    'Arbitrage Philips': 'Arb.',
    'Approuvé': 'Approved'
  }
};

const MODALITY_LABELS = {
  fr: {
    'IRM': 'IRM',
    'CT': 'CT',
    'Échographie': 'Échographie',
    'Monitorage': 'Monitorage',
    'Image-Guided Therapy': 'Image-Guided Therapy',
    'Autre': 'Autre'
  },
  en: {
    'IRM': 'MRI',
    'CT': 'CT',
    'Échographie': 'Ultrasound',
    'Monitorage': 'Monitoring',
    'Image-Guided Therapy': 'Image-Guided Therapy',
    'Autre': 'Other'
  }
};

// Funnel steps for the PI timeline (excludes 'Archivé' which is a side-track)
const FUNNEL_STEPS = [
  { key: 'Soumis' },
  { key: 'En évaluation' },
  { key: 'Chiffrage Ressources' },
  { key: 'Arbitrage Philips' },
  { key: 'Approuvé' }
];

const ADMIN_INTERNAL_DEFAULTS = {
  clinicalRelevance: 3,
  scientistComments: '',
  ipAlert: false,
  ipAlertComment: '',
  estimatedBudget: '',
  resourcesFte: '',
  resourceSizingComments: '',
  roadmapFit: 'Moyen',
  fundingSource: 'R&D',
  arbitrationComments: ''
};

const ADMIN_ROADMAP_FITS = ['Excellent', 'Moyen', 'Hors-Sujet'];
const ADMIN_FUNDING_SOURCES = ['R&D', 'Business Unit', 'Externe'];

const getNextFunnelStatus = (status) => {
  const currentIndex = FUNNEL_STEPS.findIndex(step => step.key === status);
  if (currentIndex === -1 || currentIndex >= FUNNEL_STEPS.length - 1) return status;
  return FUNNEL_STEPS[currentIndex + 1].key;
};

// Visual funnel timeline component for PI idea cards
const FunnelTimeline = ({ currentStatus, lang }) => {
  const isArchived = currentStatus === 'Archivé';
  const currentIndex = FUNNEL_STEPS.findIndex(s => s.key === currentStatus);

  // Icons per step
  const stepIcons = {
    'Soumis': Inbox,
    'En évaluation': Search,
    'Chiffrage Ressources': TrendingUp,
    'Arbitrage Philips': Layers,
    'Approuvé': CheckCircle2
  };

  if (isArchived) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700">
        <X className="w-3.5 h-3.5" />
        {STATUS_LABELS[lang]['Archivé']}
      </div>
    );
  }

  return (
    <div className="flex items-center w-full gap-0">
      {FUNNEL_STEPS.map((step, index) => {
        const isCompleted = currentIndex > index;
        const isCurrent = currentIndex === index;
        const StepIcon = stepIcons[step.key] || HelpCircle;

        return (
          <React.Fragment key={step.key}>
            {/* Step node */}
            <div className="flex flex-col items-center relative group/step" style={{ flex: '0 0 auto' }}>
              {/* Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-200'
                    : isCurrent
                      ? 'bg-philips-blue border-philips-blue text-white shadow-md shadow-philips-blue/30 ring-4 ring-philips-blue/10 scale-110'
                      : 'bg-white border-slate-200 text-slate-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <StepIcon className="w-3 h-3" />
                )}
              </div>
              {/* Label */}
              <span
                className={`text-[9px] mt-1.5 font-semibold leading-tight text-center whitespace-nowrap transition-colors duration-300 ${
                  isCompleted ? 'text-emerald-600'
                    : isCurrent ? 'text-philips-blue font-bold'
                    : 'text-slate-300'
                }`}
              >
                <span className="hidden sm:inline">{STATUS_LABELS[lang][step.key]}</span>
                <span className="sm:hidden">{STATUS_SHORT_LABELS[lang][step.key]}</span>
              </span>
            </div>

            {/* Connector line */}
            {index < FUNNEL_STEPS.length - 1 && (
              <div className="flex-1 flex items-start pt-3.5">
                <div
                  className={`h-0.5 w-full rounded-full transition-all duration-500 ${
                    currentIndex > index
                      ? 'bg-emerald-400'
                      : currentIndex === index
                        ? 'bg-gradient-to-r from-philips-blue to-slate-200'
                        : 'bg-slate-200'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const getModalityIcon = (modality) => {
  switch (modality) {
    case 'IRM':
      return <Radio className="w-4 h-4 text-sky-600" />;
    case 'CT':
      return <Layers className="w-4 h-4 text-blue-600" />;
    case 'Échographie':
      return <Waves className="w-4 h-4 text-indigo-600" />;
    case 'Monitorage':
      return <Activity className="w-4 h-4 text-emerald-600" />;
    case 'Image-Guided Therapy':
      return <Eye className="w-4 h-4 text-violet-600" />;
    default:
      return <HelpCircle className="w-4 h-4 text-slate-600" />;
  }
};

const getStatusConfig = (status) => {
  switch (status) {
    case 'Soumis':
      return {
        bg: 'bg-slate-100 border-slate-200 text-slate-700',
        dot: 'bg-slate-500'
      };
    case 'En évaluation':
      return {
        bg: 'bg-amber-50 border-amber-200 text-amber-800',
        dot: 'bg-amber-500'
      };
    case 'Chiffrage Ressources':
      return {
        bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
        dot: 'bg-indigo-500'
      };
    case 'Arbitrage Philips':
      return {
        bg: 'bg-purple-50 border-purple-200 text-purple-800',
        dot: 'bg-purple-500'
      };
    case 'Approuvé':
      return {
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        dot: 'bg-emerald-500'
      };
    case 'Archivé':
      return {
        bg: 'bg-rose-50 border-rose-200 text-rose-800',
        dot: 'bg-rose-500'
      };
    default:
      return {
        bg: 'bg-slate-50 border-slate-200 text-slate-800',
        dot: 'bg-slate-500'
      };
  }
};

const mapSupabaseIdea = (item) => ({
  id: item.id,
  title: item.title,
  problem: item.problem,
  solution: item.solution,
  modality: item.modality,
  businessUnit: item.business_unit,
  status: item.status,
  piName: item.pi_name,
  piHospital: item.pi_hospital,
  piEmail: item.pi_email,
  submittedAt: item.submitted_at,
  feedback: item.feedback_philips ?? item.feedback ?? '',
  adminInternalData: item.admin_internal_data || {},
  attachments: item.attachments || [],
  userId: item.user_id
});

export default function App() {
  const [lang, setLang] = useState('fr');
  const [user, setUser] = useState(null); // { id, email, name, hospital, role }
  const [authLoading, setAuthLoading] = useState(() => Boolean(supabase));
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  
  // Auth Form States
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authHospital, setAuthHospital] = useState('');
  const [authRole, setAuthRole] = useState('pi'); // 'pi' | 'orchestrator'

  // Dynamic role matching current user (default 'pi' if not logged in)
  const role = user ? user.role : 'pi';
  const t = useCallback((key) => COPY[lang][key] || COPY.fr[key] || key, [lang]);
  const statusLabel = useCallback((status) => STATUS_LABELS[lang][status] || status, [lang]);
  const modalityLabel = useCallback((modality) => MODALITY_LABELS[lang][modality] || modality, [lang]);
  const dateLocale = lang === 'fr' ? 'fr-FR' : 'en-US';
  
  const [ideas, setIdeas] = useState([]);

  // Selected idea for detailed drawer view
  const [selectedIdea, setSelectedIdea] = useState(null);
  
  // Drawer form state (editable copy)
  const [editTitle, setEditTitle] = useState('');
  const [editProblem, setEditProblem] = useState('');
  const [editSolution, setEditSolution] = useState('');
  const [editModality, setEditModality] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editFeedback, setEditFeedback] = useState('');
  const [editBusinessUnit, setEditBusinessUnit] = useState('');
  const [adminReviewStep, setAdminReviewStep] = useState('Soumis');
  const [adminInternalDataByIdea, setAdminInternalDataByIdea] = useState({});

  // PI submission form states
  const [newTitle, setNewTitle] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newModality, setNewModality] = useState('');
  const [tempAttachments, setTempAttachments] = useState([]); // Simulated attachments before submit

  // Search and Business Unit filters for Orchestrator view
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [buFilter, setBuFilter] = useState('Tous');

  // Notifications states
  const [toast, setToast] = useState(null);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [pendingArchiveIdea, setPendingArchiveIdea] = useState(null);
  const [orchestratorTab, setOrchestratorTab] = useState('active'); // 'active' | 'archived'

  // Toast notifier
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  }, []);

  const getAdminInternalData = useCallback((ideaId) => ({
    ...ADMIN_INTERNAL_DEFAULTS,
    ...(adminInternalDataByIdea[ideaId] || {})
  }), [adminInternalDataByIdea]);

  const updateAdminInternalField = (field, value) => {
    if (!selectedIdea) return;
    setAdminInternalDataByIdea(prev => ({
      ...prev,
      [selectedIdea.id]: {
        ...ADMIN_INTERNAL_DEFAULTS,
        ...(prev[selectedIdea.id] || {}),
        [field]: value
      }
    }));
  };

  const fetchIdeasFromSupabase = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('submitted_at', { ascending: false });
      
      if (error) throw error;
      
      setIdeas(data.map(mapSupabaseIdea));
    } catch (err) {
      console.error("Error fetching ideas:", err);
      showToast(COPY.fr.syncIdeasError, "error");
    }
  }, [showToast]);

  const fetchSupabaseProfile = useCallback(async (supabaseUser) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
      
      if (data) {
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: data.name,
          hospital: data.hospital,
          role: data.role
        });
      } else {
        const meta = supabaseUser.user_metadata || {};
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: meta.name || COPY.fr.userAccount,
          hospital: meta.hospital || COPY.fr.unspecified,
          role: meta.role || 'pi'
        });
      }
    } catch (err) {
      console.error("Error fetching profile from DB:", err);
      const meta = supabaseUser.user_metadata || {};
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email,
        name: meta.name || COPY.fr.userAccount,
        hospital: meta.hospital || COPY.fr.unspecified,
        role: meta.role || 'pi'
      });
    } finally {
      await fetchIdeasFromSupabase();
      setAuthLoading(false);
    }
  }, [fetchIdeasFromSupabase]);

  // 1. Session check on mount
  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          fetchSupabaseProfile(session.user);
        } else {
          setAuthLoading(false);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          fetchSupabaseProfile(session.user);
        } else {
          setUser(null);
          setIdeas([]);
          setAuthLoading(false);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [fetchSupabaseProfile]);

  useEffect(() => {
    if (!user) return;

    if (window.location.hash !== '#app') {
      window.history.pushState({ gatewayView: 'app' }, '', '#app');
    }

    const handleBackToLogin = () => {
      if (window.location.hash === '#app') return;
      supabase?.auth.signOut();
      setUser(null);
      setIdeas([]);
      setSelectedIdea(null);
    };

    window.addEventListener('popstate', handleBackToLogin);
    return () => window.removeEventListener('popstate', handleBackToLogin);
  }, [user]);

  // Auth Submit Handlers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      if (supabase) {
        // Online sign in
        setAuthSubmitting(true);
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: authEmail,
            password: authPassword
          });
          if (error) throw error;
          showToast(t('loginSuccess'), "success");
        } catch (err) {
          const message = err.message?.toLowerCase().includes('invalid login credentials')
            ? t('loginInvalid')
            : t('loginError');
          showToast(message, "error");
        } finally {
          setAuthSubmitting(false);
        }
      } else {
        showToast(t('supabaseLoginMissing'), "error");
      }
    } else {
      if (supabase) {
        // Online sign up
        setAuthSubmitting(true);
        try {
          const { data, error } = await supabase.auth.signUp({
            email: authEmail,
            password: authPassword,
            options: {
              data: {
                name: authName,
                hospital: authRole === 'pi' ? authHospital : 'Philips',
                role: authRole
              }
            }
          });
          if (error) throw error;
          
          if (data.user) {
            // Sync user details to profiles table
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert([{
                id: data.user.id,
                name: authName,
                hospital: authRole === 'pi' ? authHospital : 'Philips',
                role: authRole
              }], { onConflict: 'id' });
            if (profileError) {
              console.warn("Profiles upsert warning:", profileError.message);
            }
          }
          if (data.session) {
            showToast(t('signupSuccess'), "success");
          } else {
            showToast(t('signupConfirmEmail'), "info");
          }
        } catch (err) {
          showToast(err.message || t('signupError'), "error");
        } finally {
          setAuthSubmitting(false);
        }
      } else {
        showToast(t('signupMissingSupabase'), "error");
      }
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      setUser(null);
      setIdeas([]);
    }
    setSelectedIdea(null);
    window.history.replaceState(null, '', window.location.pathname);
    showToast(t('logoutSuccess'), "info");
  };

  // Dashboard calculations for orchestrator
  const activeOrchestratorIdeas = ideas.filter(i => i.status !== 'Archivé');
  const archivedOrchestratorIdeas = ideas.filter(i => i.status === 'Archivé');
  const visibleOrchestratorIdeas = orchestratorTab === 'archived'
    ? archivedOrchestratorIdeas
    : activeOrchestratorIdeas;
  const orchestratorStatuses = STATUSES.filter(status => status !== 'Archivé');
  const totalIdeas = activeOrchestratorIdeas.length;
  const inEvaluationCount = activeOrchestratorIdeas.filter(i => i.status === 'En évaluation').length;
  const approvedCount = activeOrchestratorIdeas.filter(i => i.status === 'Approuvé').length;


  // Handle file upload — reads content as base64 so it survives page reloads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    let loaded = 0;
    const results = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        results.push({
          name: file.name,
          size: file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${(file.size / 1024).toFixed(0)} KB`,
          dataUrl: ev.target.result
        });
        loaded++;
        if (loaded === files.length) {
          setTempAttachments(prev => [...prev, ...results]);
          showToast(`${files.length} ${t('filesAttached')}`, 'info');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeTempAttachment = (index) => {
    setTempAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Triggers file download — uses stored base64 dataUrl, or generates a placeholder for mock data
  const handleDownloadAttachment = (e, file) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    let downloadUrl;
    let needsRevoke = false;

    if (file.dataUrl) {
      // Real uploaded file stored as base64 — works after reload
      downloadUrl = file.dataUrl;
    } else {
      // Mock/demo file: generate a representative text document
      const mockContent =
        `Document de recherche clinique Philips\n` +
        `===================================\n` +
        `Fichier : ${file.name}\n` +
        `Taille  : ${file.size || 'N/A'}\n\n` +
        `${t('mockFileIntro')}\n` +
        t('mockFileServer');
      const blob = new Blob([mockContent], { type: 'text/plain;charset=utf-8' });
      downloadUrl = URL.createObjectURL(blob);
      needsRevoke = true;
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (needsRevoke) {
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
    }
    showToast(`${t('downloadStarted')} "${file.name}" ${t('downloadStartedSuffix')}`, 'success');
  };

  // PI Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!newTitle.trim()) {
      showToast(t('titleRequired'), "error");
      return;
    }
    if (!newModality) {
      showToast(t('modalityRequired'), "error");
      return;
    }
    if (newProblem.length > 1500) {
      showToast(t('problemTooLong'), "error");
      return;
    }
    if (newSolution.length > 1500) {
      showToast(t('solutionTooLong'), "error");
      return;
    }

    const submittedAt = new Date().toISOString();
    const generatedId = `idea-${submittedAt.replace(/\D/g, '')}`;

    const newIdea = {
      id: generatedId,
      title: newTitle,
      problem: newProblem,
      solution: newSolution,
      modality: newModality,
      businessUnit: '', // Starts empty, to be assigned by Orchestrator
      status: 'Soumis',
      piName: user?.name || t('anonymousDoctor'),
      piHospital: user?.hospital || t('unknownHospital'),
      piEmail: user?.email || 'anon@example.com',
      submittedAt,
      feedback: '',
      attachments: tempAttachments,
      userId: user?.id || null
    };

    if (supabase) {
      try {
        const { error } = await supabase
          .from('ideas')
          .insert([{
            id: newIdea.id,
            title: newIdea.title,
            problem: newIdea.problem,
            solution: newIdea.solution,
            modality: newIdea.modality,
            business_unit: newIdea.businessUnit,
            status: newIdea.status,
            pi_name: newIdea.piName,
            pi_hospital: newIdea.piHospital,
            pi_email: newIdea.piEmail,
            submitted_at: newIdea.submittedAt,
            feedback_philips: newIdea.feedback,
            admin_internal_data: {},
            attachments: newIdea.attachments,
            user_id: user?.id
          }]);

        if (error) throw error;

        setIdeas([newIdea, ...ideas]);
        showToast(t('ideaSaved'), "success");
      } catch (err) {
        console.error("Error saving idea to online service:", err);
        showToast(err.message || t('ideaSaveError'), "error");
      }
    } else {
      showToast(t('ideaNotSavedNoSupabase'), "error");
      return;
    }
    
    // Clear states
    setNewTitle('');
    setNewProblem('');
    setNewSolution('');
    setNewModality('');
    setTempAttachments([]);
  };

  const handleAdminDrawerSave = async (advanceFunnel = false) => {
    if (!selectedIdea) return;

    const targetStatus = advanceFunnel ? getNextFunnelStatus(editStatus) : editStatus;
    const nextInternalData = getAdminInternalData(selectedIdea.id);

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('ideas')
          .update({
            status: targetStatus,
            feedback_philips: editFeedback,
            business_unit: editBusinessUnit,
            admin_internal_data: nextInternalData
          })
          .eq('id', selectedIdea.id)
          .select('*')
          .single();

        if (error) throw error;
        if (!data) throw new Error(t('updateError'));

        const savedIdea = mapSupabaseIdea(data);
        setIdeas(prev => prev.map(idea => (
          idea.id === savedIdea.id ? savedIdea : idea
        )));
        setSelectedIdea(savedIdea);
        setEditStatus(savedIdea.status);
        setEditFeedback(savedIdea.feedback || '');
        setEditBusinessUnit(savedIdea.businessUnit || '');
        setAdminInternalDataByIdea(prev => ({
          ...prev,
          [savedIdea.id]: {
            ...ADMIN_INTERNAL_DEFAULTS,
            ...(savedIdea.adminInternalData || nextInternalData)
          }
        }));
        if (advanceFunnel) {
          setAdminReviewStep(savedIdea.status);
        }
        showToast(t('updateSaved'), "success");
      } catch (err) {
        console.error("Error updating admin fields in online service:", err);
        showToast(err.message || t('updateError'), "error");
        return;
      }
    } else {
      const updatedFields = {
        status: targetStatus,
        feedback: editFeedback,
        businessUnit: editBusinessUnit,
        adminInternalData: nextInternalData
      };
      setIdeas(prev => prev.map(idea => (
        idea.id === selectedIdea.id ? { ...idea, ...updatedFields } : idea
      )));
      setSelectedIdea(prev => prev ? { ...prev, ...updatedFields } : prev);
      setEditStatus(targetStatus);
      if (advanceFunnel) {
        setAdminReviewStep(targetStatus);
      }
    }

    setShowUpdateConfirmation(true);
    setTimeout(() => {
      setShowUpdateConfirmation(false);
    }, 4000);
  };

  // Idea Edit Handler
  const handleUpdateIdea = async (e) => {
    e.preventDefault();
    if (!selectedIdea) return;

    if (role === 'orchestrator') {
      await handleAdminDrawerSave(false);
      return;
    }

    if (!editTitle.trim()) {
      showToast(t('updateTitleRequired'), "error");
      return;
    }

    const updatedFields = {
      title: editTitle,
      problem: editProblem,
      solution: editSolution,
      modality: editModality
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('ideas')
          .update({
            title: editTitle,
            problem: editProblem,
            solution: editSolution,
            modality: editModality
          })
          .eq('id', selectedIdea.id)
          .select('*')
          .single();

        if (error) throw error;
        if (!data) throw new Error(t('updateError'));

        const savedIdea = mapSupabaseIdea(data);
        setIdeas(prev => prev.map(idea => (
          idea.id === savedIdea.id ? savedIdea : idea
        )));
        setSelectedIdea(savedIdea);
        showToast(t('ideaUpdated'), "success");
      } catch (err) {
        console.error("Error updating idea in online service:", err);
        showToast(err.message || t('updateError'), "error");
        return;
      }
    }

    if (!supabase) {
      setIdeas(prev => prev.map(idea => (
        idea.id === selectedIdea.id ? { ...idea, ...updatedFields } : idea
      )));
      setSelectedIdea(prev => ({
        ...prev,
        ...updatedFields
      }));
    }

    // Trigger explicit confirmation message
    setShowUpdateConfirmation(true);
    // Close/dim confirmation message after 4s
    setTimeout(() => {
      setShowUpdateConfirmation(false);
    }, 4000);
  };

  const requestArchiveIdea = (idea) => {
    setPendingArchiveIdea(idea);
  };

  const confirmArchiveIdea = async () => {
    const idea = pendingArchiveIdea;
    if (!idea) return;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('ideas')
          .update({ status: 'Archivé' })
          .eq('id', idea.id)
          .select('*')
          .single();

        if (error) throw error;
        if (!data) throw new Error(t('updateError'));
        const archivedIdea = mapSupabaseIdea(data);
        setIdeas(prev => prev.map(item => (
          item.id === archivedIdea.id ? archivedIdea : item
        )));
        if (selectedIdea?.id === archivedIdea.id) {
          setSelectedIdea(archivedIdea);
        }
      } catch (err) {
        console.error("Error archiving idea in online service:", err);
        showToast(err.message || t('updateError'), "error");
        return;
      }
    } else {
      setIdeas(prev => prev.map(item => (
        item.id === idea.id ? { ...item, status: 'Archivé' } : item
      )));
      if (selectedIdea?.id === idea.id) {
        setSelectedIdea(prev => prev ? { ...prev, status: 'Archivé' } : prev);
      }
    }
    setPendingArchiveIdea(null);
    showToast(t('ideaArchived'), "success");
  };

  // Select idea to view details & initialize drawer inputs
  const openDetails = (idea) => {
    setSelectedIdea(idea);
    setEditTitle(idea.title);
    setEditProblem(idea.problem);
    setEditSolution(idea.solution);
    setEditModality(idea.modality);
    setEditStatus(idea.status);
    setEditFeedback(idea.feedback || '');
    setEditBusinessUnit(idea.businessUnit || '');
    setAdminReviewStep(FUNNEL_STEPS.some(step => step.key === idea.status) ? idea.status : 'Soumis');
    setAdminInternalDataByIdea(prev => ({
      ...prev,
      [idea.id]: {
        ...ADMIN_INTERNAL_DEFAULTS,
        ...(idea.adminInternalData || prev[idea.id] || {})
      }
    }));
    setShowUpdateConfirmation(false);
  };

  // Tab for active vs archived ideas in PI view
  const [ideaTab, setIdeaTab] = useState('active'); // 'active' | 'archived'

  // Filtered ideas based on selected tab (PI View)
  const filteredPIIdeas = ideas.filter(idea => {
    // PIs must only see their own submitted ideas
    const isOwnIdea = user && (idea.piEmail === user.email || idea.userId === user.id);
    if (!isOwnIdea) return false;

    if (ideaTab === 'archived') return idea.status === 'Archivé';
    return idea.status !== 'Archivé';
  });

  // Filter ideas for Orchestrator
  const filteredOrchestratorIdeas = visibleOrchestratorIdeas.filter(idea => {
    const matchesSearch = 
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.piName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.piHospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (idea.feedback && idea.feedback.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = orchestratorTab === 'archived' || statusFilter === 'Tous' || idea.status === statusFilter;
    const matchesBU = buFilter === 'Tous' || idea.businessUnit === buFilter;

    return matchesSearch && matchesStatus && matchesBU;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-philips-blue rounded-full animate-spin"></div>
          <p className="text-slate-500 font-semibold text-sm tracking-wide">{t('loadingPortal')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-premium overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px] border border-slate-100">
          
          {/* Left Column: Corporate Brand / Value Prop */}
          <div className="md:col-span-5 bg-gradient-to-br from-philips-dark-blue to-philips-blue p-8 text-white flex flex-col justify-between relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <Sparkles className="w-64 h-64 -mr-16 -mt-16 text-white" />
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold tracking-widest text-white text-base">PHILIPS</span>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-black leading-tight tracking-tight text-white">Clinical Research & Innovation Gateway</h2>
                <p className="text-slate-200 text-xs leading-relaxed">{t('portalSubtitle')}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold block">{t('simpleSubmission')}</span>
                    <span className="text-slate-300">{t('simpleSubmissionCopy')}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold block">{t('liveTracking')}</span>
                    <span className="text-slate-300">{t('liveTrackingCopy')}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold block">{t('directFeedback')}</span>
                    <span className="text-slate-300">{t('directFeedbackCopy')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 mt-8 border-t border-white/10 pt-4 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>{t('versionLabel')}</span>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-7 p-8 flex flex-col justify-between text-left">
            <div>
              <div className="flex justify-end mb-6">
                <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                  {Object.keys(LANGUAGE_LABELS).map(code => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLang(code)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition ${
                        lang === code ? 'bg-white text-philips-blue shadow-sm' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {LANGUAGE_LABELS[code]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Mode Selector */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  onClick={() => { setAuthMode('login'); }}
                  className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all ${
                    authMode === 'login' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t('signIn')}
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); }}
                  className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all ${
                    authMode === 'signup' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t('createAccount')}
                </button>
              </div>

              <h3 className="text-xl font-extrabold text-slate-800 tracking-tight mb-2">
                {authMode === 'login' ? t('welcomeBack') : t('joinGateway')}
              </h3>
              <p className="text-slate-500 text-xs mb-6">
                {authMode === 'login' 
                  ? t('loginIntro')
                  : t('signupIntro')}
              </p>

              {!supabase && (
                <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 leading-relaxed">
                  {t('supabaseConfigWarning')}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t('fullName')}</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="Dr. Jean Dupont"
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t('accountType')}</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setAuthRole('pi')}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition ${
                            authRole === 'pi' 
                              ? 'border-philips-blue bg-philips-light-blue/50 text-philips-blue' 
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {t('userAccount')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuthRole('orchestrator')}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition ${
                            authRole === 'orchestrator' 
                              ? 'border-philips-blue bg-philips-light-blue/50 text-philips-blue' 
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {t('adminAccount')}
                        </button>
                      </div>
                    </div>

                    {authRole === 'pi' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t('hospitalInstitution')}</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="HCL - Hospices Civils de Lyon"
                            value={authHospital}
                            onChange={(e) => setAuthHospital(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t('emailAddress')}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="jean.dupont@ch-hopital.fr"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t('password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full bg-philips-blue hover:bg-philips-accent disabled:bg-slate-300 disabled:shadow-none text-white py-3 rounded-xl text-xs font-bold tracking-wide shadow-md shadow-philips-blue/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed mt-2"
                >
                  {authSubmitting ? '...' : (authMode === 'login' ? t('signIn') : t('createAccess'))}
                </button>
              </form>

            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-philips-blue/20 selection:text-philips-blue">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50">
          <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 animate-slideLeft ${
            toast.type === 'error' ? 'bg-red-50 text-red-950 border-red-200' :
            toast.type === 'info' ? 'bg-sky-50 text-sky-950 border-sky-200' :
            'bg-emerald-50 text-emerald-950 border-emerald-200'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-sky-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {pendingArchiveIdea && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setPendingArchiveIdea(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
            <div className="p-6 text-left">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
                <Archive className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                {t('archiveConfirmTitle')}
              </h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {t('archiveConfirmBody')}
              </p>
              <p className="text-sm font-bold text-slate-800 mt-4 line-clamp-2">
                {pendingArchiveIdea.title}
              </p>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingArchiveIdea(null)}
                className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-bold transition cursor-pointer"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={confirmArchiveIdea}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-2"
              >
                <Archive className="w-4 h-4" />
                {t('confirmArchive')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 border-b border-slate-100 z-30 transition-all-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-philips-blue rounded-xl flex items-center justify-center shadow-md shadow-philips-blue/20 hover:scale-105 transition duration-300">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-widest text-philips-blue text-lg">PHILIPS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-philips-accent"></span>
                <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Gateway</span>
              </div>
              <h1 className="text-sm font-semibold text-slate-600 -mt-1 hidden sm:block">Clinical Research & Innovation Gateway</h1>
            </div>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              {Object.keys(LANGUAGE_LABELS).map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition ${
                    lang === code ? 'bg-white text-philips-blue shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {LANGUAGE_LABELS[code]}
                </button>
              ))}
            </div>
            
            {/* Profile Tag */}
            <div className="flex items-center gap-2.5 bg-slate-100 border border-slate-200/50 pl-3 pr-4 py-1.5 rounded-full">
              <div className="w-6 h-6 rounded-full bg-philips-blue flex items-center justify-center text-[10px] font-extrabold text-white">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'U'}
              </div>
              <div className="text-left leading-tight">
                <span className="block text-xs font-bold text-slate-800 truncate max-w-[120px]">{user?.name}</span>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  {user?.role === 'orchestrator' ? t('roleOrchestrator') : t('rolePI')}
                </span>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleSignOut}
              title={t('logoutTitle')}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ============================================== */}
        {/* 1. PRIVATE INVESTIGATOR VIEW                   */}
        {/* ============================================== */}
        {role === 'pi' && (
          <div className="space-y-8 animate-fadeIn duration-500">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-amber-700 text-sm font-semibold leading-relaxed text-left">
              ⚠️ Version Démo – Cet outil est un prototype en cours d'évaluation. Pour des raisons de confidentialité et de propriété intellectuelle, merci de ne saisir AUCUNE donnée réelle de patient, information nominative ou secret de recherche critique.
            </div>
            
            <div className="bg-gradient-to-r from-philips-dark-blue to-philips-blue p-8 rounded-3xl text-white shadow-premium relative overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center pr-10">
                <Sparkles className="w-64 h-64 text-white" />
              </div>
              <div className="relative z-10 max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wide mb-4 border border-white/10">
                  <User className="w-3.5 h-3.5 text-philips-light-blue" />
                  {t('practitionerSpace')}
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight">{t('greeting')}, {user?.name || t('practitionerFallback')}</h2>
                <p className="text-slate-200 mt-2 text-sm leading-relaxed text-left">
                  {t('practitionerWelcome')}<strong>{user?.hospital || t('yourInstitution')}</strong>{t('practitionerWelcomeSuffix')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Submission Form (Left) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-premium border border-slate-100 relative">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-philips-light-blue rounded-lg text-philips-blue">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-base">{t('submitIdea')}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{t('describeConcept')}</p>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      {t('ideaTitle')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('titlePlaceholder')}
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      {t('modalityPhilips')}
                    </label>
                    <select
                      required
                      value={newModality}
                      onChange={(e) => setNewModality(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition duration-200 bg-white ${
                        newModality ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      <option value="" disabled>{t('selectModality')}</option>
                      {MODALITIES.map((mod) => (
                        <option key={mod} value={mod}>{modalityLabel(mod)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        {t('clinicalProblem')}
                      </label>
                      <span className={`text-[10px] font-medium ${
                        newProblem.length > 1400 ? 'text-red-500 font-bold' : 
                        newProblem.length > 1100 ? 'text-amber-500' : 'text-slate-400'
                      }`}>
                        {newProblem.length}/1500 {t('chars')}
                      </span>
                    </div>
                    <textarea
                      required
                      maxLength={1500}
                      rows={5}
                      placeholder={t('problemPlaceholder')}
                      value={newProblem}
                      onChange={(e) => setNewProblem(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition duration-200 resize-none text-slate-700"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        {t('proposedSolution')}
                      </label>
                      <span className={`text-[10px] font-medium ${
                        newSolution.length > 1400 ? 'text-red-500 font-bold' : 
                        newSolution.length > 1100 ? 'text-amber-500' : 'text-slate-400'
                      }`}>
                        {newSolution.length}/1500 {t('chars')}
                      </span>
                    </div>
                    <textarea
                      required
                      maxLength={1500}
                      rows={5}
                      placeholder={t('solutionPlaceholder')}
                      value={newSolution}
                      onChange={(e) => setNewSolution(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition duration-200 resize-none text-slate-700"
                    />
                  </div>

                  {/* Attachment section */}
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      {t('attachmentsLabel')}
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 hover:border-slate-400 transition-all duration-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Paperclip className="w-5 h-5 text-slate-400 mb-1" />
                          <p className="text-xs text-slate-500"><span className="font-semibold">{t('clickToAdd')}</span> {t('dragDrop')}</p>
                        </div>
                        <input 
                          type="file" 
                          multiple 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    {/* Temp Attachments List */}
                    {tempAttachments.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {tempAttachments.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
                            <span className="flex items-center gap-1.5 text-slate-600 truncate max-w-[80%]">
                              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{file.name}</span>
                              <span className="text-[10px] text-slate-400 shrink-0">({file.size})</span>
                            </span>
                            <button 
                              type="button" 
                              onClick={() => removeTempAttachment(idx)}
                              className="text-slate-400 hover:text-red-500 transition"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-philips-blue hover:bg-philips-accent text-white py-3 rounded-xl text-sm font-bold tracking-wide shadow-md shadow-philips-blue/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    {t('submitIdeaButton')}
                  </button>

                </form>
              </div>

              {/* Submitted Ideas (Right) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Tab selector for ideas */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setIdeaTab('active')}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                      ideaTab === 'active'
                        ? 'bg-philips-blue text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t('submittedIdeas')}
                  </button>
                  <button
                    onClick={() => setIdeaTab('archived')}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                      ideaTab === 'archived'
                        ? 'bg-philips-blue text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t('archivedIdeas')}
                  </button>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">
                      {ideaTab === 'archived' ? t('archivedIdeas') : t('submittedIdeas')}
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      {ideaTab === 'archived' ? t('archivedIdeasList') : t('proposalTracking')}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                    {filteredPIIdeas.length} {t('ideaSingular')}{filteredPIIdeas.length !== 1 ? t('ideaPluralSuffix') : ''}
                  </span>
                </div>

                {filteredPIIdeas.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-premium">
                    <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium text-sm">
                      {ideaTab === 'archived' ? t('noArchivedIdeas') : t('noSubmittedIdeas')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPIIdeas.map((idea) => {
                      return (
                        <div 
                          key={idea.id}
                          className="bg-white rounded-2xl p-6 shadow-premium border border-slate-100 hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group"
                        >


                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(idea.submittedAt).toLocaleDateString(dateLocale, {
                                  day: '2-digit', month: 'short', year: 'numeric'
                                })}
                              </span>
                              <h4 className="font-extrabold text-slate-800 text-base mt-1 group-hover:text-philips-blue transition duration-200">
                                {idea.title}
                              </h4>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200/50 rounded-full text-xs font-semibold text-slate-700">
                                {getModalityIcon(idea.modality)}
                                {modalityLabel(idea.modality)}
                              </span>
                              <button
                                type="button"
                                onClick={() => openDetails(idea)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:border-philips-blue hover:text-philips-blue rounded-full text-xs font-bold text-slate-600 transition"
                              >
                                <Edit3 className="w-3 h-3" />
                                {t('edit')}
                              </button>
                              {idea.status !== 'Archivé' && (
                                <button
                                  type="button"
                                  onClick={() => requestArchiveIdea(idea)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:border-rose-300 hover:text-rose-700 rounded-full text-xs font-bold text-slate-600 transition"
                                >
                                  <Archive className="w-3 h-3" />
                                  {t('archive')}
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            <div>
                              <span className="block font-bold text-slate-500 uppercase tracking-wider mb-1 text-slate-400">
                                {t('clinicalProblem')}
                              </span>
                              <p className="text-slate-700 line-clamp-4 leading-relaxed whitespace-pre-wrap">{idea.problem}</p>
                            </div>
                            <div>
                              <span className="block font-bold text-slate-500 uppercase tracking-wider mb-1 text-slate-400">
                                {t('proposedSolution')}
                              </span>
                              <p className="text-slate-700 line-clamp-4 leading-relaxed whitespace-pre-wrap">{idea.solution}</p>
                            </div>
                          </div>

                          {/* Funnel Timeline */}
                          <div className="mt-4 p-3 bg-slate-50/80 border border-slate-100 rounded-xl">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">{t('progress')}</span>
                            <FunnelTimeline currentStatus={idea.status} lang={lang} />
                          </div>

                          {/* Attachments Display with Download */}
                          {idea.attachments && idea.attachments.length > 0 && (
                            <div className="mt-3">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">{t('fileAttachments')}</span>
                              <div className="flex flex-wrap gap-2">
                                {idea.attachments.map((file, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={(e) => handleDownloadAttachment(e, file)}
                                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 px-2.5 py-1 rounded-lg text-xs text-slate-700 transition font-medium cursor-pointer"
                                  >
                                    <FileText className="w-3 h-3 text-slate-400" />
                                    <span>{file.name}</span>
                                    <span className="text-[9px] text-slate-400 font-normal">({file.size})</span>
                                    <Download className="w-3 h-3 text-slate-400 ml-0.5" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {idea.feedback ? (
                            <div className="mt-4 p-4 bg-sky-50/70 border border-sky-100 rounded-xl flex items-start gap-3">
                              <div className="p-1.5 bg-sky-100 rounded-lg text-sky-700 shrink-0 mt-0.5">
                                <MessageSquare className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="block text-[10px] font-bold text-sky-800 uppercase tracking-wider">
                                  Feedback
                                </span>
                                <p className="text-xs text-sky-900 mt-1 leading-relaxed">{idea.feedback}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 italic">
                              <Clock className="w-3.5 h-3.5" />
                              {t('noFeedbackYet')}
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* ============================================== */}
        {/* 2. ORCHESTRATOR VIEW                           */}
        {/* ============================================== */}
        {role === 'orchestrator' && (
          <div className="space-y-8 animate-fadeIn duration-500">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="md:col-span-1 flex flex-col justify-center text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-philips-light-blue text-philips-blue rounded-full text-xs font-semibold tracking-wide w-fit mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('managerSpace')}
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{t('dashboard')}</h2>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-premium flex items-center justify-between hover:border-slate-200 transition group text-left">
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t('totalIdeas')}</span>
                  <span className="text-3xl font-black text-slate-800">{totalIdeas}</span>
                </div>
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-slate-100 transition duration-300">
                  <Inbox className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-premium flex items-center justify-between hover:border-slate-200 transition group text-left">
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t('inEvaluation')}</span>
                  <span className="text-3xl font-black text-amber-600">{inEvaluationCount}</span>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-100 transition duration-300">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-premium flex items-center justify-between hover:border-slate-200 transition group text-left">
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t('approvedPlural')}</span>
                  <span className="text-3xl font-black text-emerald-600">{approvedCount}</span>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-100 transition duration-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

            </div>

            <div className="space-y-5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOrchestratorTab('active');
                    setStatusFilter('Tous');
                  }}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                    orchestratorTab === 'active'
                      ? 'bg-philips-blue text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t('activeIdeas')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOrchestratorTab('archived');
                    setStatusFilter('Tous');
                  }}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                    orchestratorTab === 'archived'
                      ? 'bg-philips-blue text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t('archivedIdeas')}
                </button>
              </div>

              {/* Filters Panel */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-premium flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {/* BU Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('buFilter')}</span>
                    <select
                      value={buFilter}
                      onChange={(e) => setBuFilter(e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 bg-slate-50 text-xs font-semibold rounded-lg focus:outline-none focus:ring-1 focus:ring-philips-blue text-slate-700"
                    >
                      <option value="Tous">{t('allBus')}</option>
                      <option value="">{t('unassigned')}</option>
                      {BUSINESS_UNITS.map(bu => (
                        <option key={bu} value={bu}>{bu}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filters */}
                  <div className="flex flex-wrap items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200/50">
                    <button
                      onClick={() => setStatusFilter('Tous')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        statusFilter === 'Tous'
                          ? 'bg-white text-philips-blue shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                    }`}
                    >
                      {t('all')}
                    </button>
                    {(orchestratorTab === 'archived' ? ['Archivé'] : orchestratorStatuses).map(status => {
                      const count = visibleOrchestratorIdeas.filter(i => i.status === status).length;
                      return (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                            statusFilter === status
                              ? 'bg-white text-philips-blue shadow-sm'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <span>{statusLabel(status)}</span>
                          {count > 0 && (
                            <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 text-[9px] rounded-full font-black">
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Grid lists */}
              {filteredOrchestratorIdeas.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center border border-slate-100 shadow-premium">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium text-sm">{t('noIdeaMatches')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredOrchestratorIdeas.map((idea) => {
                    const statusCfg = getStatusConfig(idea.status);
                    const isSelected = selectedIdea?.id === idea.id;
                    
                    return (
                      <div
                        key={idea.id}
                        onClick={() => openDetails(idea)}
                        className={`bg-white rounded-2xl p-5 border shadow-premium hover:shadow-premium-hover transition-all duration-300 cursor-pointer text-left relative overflow-hidden flex flex-col justify-between h-60 group ${
                          isSelected 
                            ? 'border-philips-blue ring-2 ring-philips-blue/15' 
                            : 'border-slate-100 hover:-translate-y-0.5'
                        }`}
                      >
                        <div className={`absolute top-0 left-0 w-full h-1.5 ${statusCfg.dot}`} />

                        <div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-2">
                            <div className="flex items-center gap-2">
                              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-lg text-slate-600">
                                {getModalityIcon(idea.modality)}
                                {modalityLabel(idea.modality)}
                              </span>
                              
                              {idea.businessUnit ? (
                                <span className="bg-blue-50 border border-blue-200/60 text-philips-blue px-2 py-0.5 rounded-lg font-bold">
                                  BU : {idea.businessUnit}
                                </span>
                              ) : (
                                <span className="bg-slate-50 text-slate-400 border border-slate-200/30 px-2 py-0.5 rounded-lg italic font-normal">
                                  {t('buUnassigned')}
                                </span>
                              )}
                            </div>

                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {new Date(idea.submittedAt).toLocaleDateString(dateLocale)}
                            </span>
                          </div>

                          <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-philips-blue transition duration-200 line-clamp-1">
                            {idea.title}
                          </h4>

                          <p className="text-slate-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                            {idea.problem}
                          </p>
                        </div>

                        {idea.attachments && idea.attachments.length > 0 && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mt-1">
                            <Paperclip className="w-3 h-3" />
                            <span>{idea.attachments.length} {t('attachmentCount')}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100/50">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 border border-slate-200/50">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <div className="text-left">
                              <span className="block text-xs font-bold text-slate-700 -mb-0.5">{idea.piName}</span>
                              <span className="block text-[9px] text-slate-400 flex items-center gap-0.5 font-medium">
                                <Building className="w-2.5 h-2.5 text-slate-400" />
                                {idea.piHospital}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusCfg.bg}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                              {statusLabel(idea.status)}
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-philips-blue transition transform group-hover:translate-x-0.5" />
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white tracking-widest">PHILIPS</span>
            <span>|</span>
            <span>Clinical Research & Innovation Gateway MVP</span>
          </div>
          <div>
            <span>{t('footerSync')}</span>
          </div>
        </div>
      </footer>

      {/* ============================================== */}
      {/* 3. SLIDING DRAWER / DETAILS PANEL (EDIT MODE)  */}
      {/* ============================================== */}
      {selectedIdea && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          
          <div 
            onClick={() => setSelectedIdea(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300" 
          />

          <div className="relative w-full max-w-5xl bg-white shadow-2xl flex flex-col h-full z-10 transition-transform duration-300 ease-in-out transform translate-x-0 border-l border-slate-200">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {role === 'orchestrator' ? t('editModeOrchestrator') : t('editModePI')}
                </span>
                <h3 className="font-extrabold text-base mt-1 line-clamp-1 text-white">
                  {selectedIdea.title}
                </h3>
                {role === 'orchestrator' && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {selectedIdea.piName}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusConfig(editStatus || selectedIdea.status).bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusConfig(editStatus || selectedIdea.status).dot}`} />
                      {statusLabel(editStatus || selectedIdea.status)}
                    </span>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setSelectedIdea(null)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explicit Confirmation Banner inside the drawer */}
            {showUpdateConfirmation && (
              <div className="bg-emerald-500 text-white px-6 py-4 flex items-center gap-3 animate-fadeIn shadow-inner">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div className="text-left text-xs font-semibold">
                  {t('updateSuccess')}
                </div>
                <button 
                  onClick={() => setShowUpdateConfirmation(false)}
                  className="ml-auto text-emerald-100 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Scrollable Form */}
            <form onSubmit={handleUpdateIdea} className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
              {role === 'orchestrator' ? (
                <>
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden text-left shadow-sm">
                    <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {t('internalWorkNotes')}
                        </p>
                        <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                          {t('caseManagement')}
                        </h4>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Admin
                      </span>
                    </div>

                    <div className="p-5 border-b border-slate-100 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('currentCaseStatus')}
                          </label>
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-philips-blue/15"
                          >
                            {STATUSES.map(status => (
                              <option key={status} value={status}>{statusLabel(status)}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('viewedWorkflowStep')}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {FUNNEL_STEPS.map(step => (
                              <button
                                key={step.key}
                                type="button"
                                onClick={() => setAdminReviewStep(step.key)}
                                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black border transition ${
                                  adminReviewStep === step.key
                                    ? 'bg-philips-blue border-philips-blue text-white shadow-sm'
                                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                }`}
                              >
                                {STATUS_SHORT_LABELS[lang][step.key] || statusLabel(step.key)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {t('viewedWorkflowStepHelp')}
                      </p>
                    </div>

                    <div className="p-5 space-y-5 divide-y divide-slate-100">
                      {adminReviewStep === 'Soumis' && (
                        <section className="space-y-4">
                          <div>
                            <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                              {t('piSubmission')}
                            </h5>
                            <p className="text-xs text-slate-400 mt-1">
                              {t('piSubmissionHelp')}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                {t('ideaTitle')}
                              </span>
                              <p className="text-sm font-extrabold text-slate-900 leading-snug">
                                {selectedIdea.title}
                              </p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                {t('clinicalModality')}
                              </span>
                              <p className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                                {getModalityIcon(selectedIdea.modality)}
                                {modalityLabel(selectedIdea.modality)}
                              </p>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                {t('businessUnitAssignment')}
                              </label>
                              <select
                                value={editBusinessUnit}
                                onChange={(e) => setEditBusinessUnit(e.target.value)}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-philips-blue/15"
                              >
                                <option value="">{t('selectBU')}</option>
                                {BUSINESS_UNITS.map(bu => (
                                  <option key={bu} value={bu}>{bu}</option>
                                ))}
                              </select>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                  {t('submitterDoctor')}
                                </span>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                  <p className="text-sm font-extrabold text-slate-900">{selectedIdea.piName}</p>
                                  <p className="text-xs text-slate-500 mt-0.5">{selectedIdea.piHospital}</p>
                                </div>
                              </div>
                              <div>
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                  Date
                                </span>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                  <p className="text-sm font-extrabold text-slate-900">
                                    {new Date(selectedIdea.submittedAt).toLocaleDateString(dateLocale, {
                                      day: '2-digit', month: 'short', year: 'numeric'
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                {t('clinicalProblem')}
                              </span>
                              <div className="min-h-36 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {selectedIdea.problem}
                              </div>
                            </div>
                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                {t('proposedSolution')}
                              </span>
                              <div className="min-h-36 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {selectedIdea.solution}
                              </div>
                            </div>
                          </div>
                        </section>
                      )}

                      {adminReviewStep === 'En évaluation' && (
                        <section className="space-y-4 pt-5 first:pt-0">
                          <div>
                            <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                              {t('scientificEvaluation')}
                            </h5>
                            <p className="text-xs text-slate-400 mt-1">
                              {t('scientificEvaluationDescription')}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {t('clinicalRelevance')}
                              </label>
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-xs font-black">
                                {getAdminInternalData(selectedIdea.id).clinicalRelevance}/5
                              </span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="5"
                              step="1"
                              value={getAdminInternalData(selectedIdea.id).clinicalRelevance}
                              onChange={(e) => updateAdminInternalField('clinicalRelevance', Number(e.target.value))}
                              className="w-full accent-philips-blue"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              {t('clinicalScientistComments')}
                            </label>
                            <textarea
                              rows={4}
                              value={getAdminInternalData(selectedIdea.id).scientistComments}
                              onChange={(e) => updateAdminInternalField('scientistComments', e.target.value)}
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-700 focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white resize-none"
                            />
                          </div>
                          <label className="flex items-center justify-between gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                            <span className="text-xs font-bold text-slate-700">
                              {t('ipAlert')}
                            </span>
                            <span className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                              getAdminInternalData(selectedIdea.id).ipAlert ? 'bg-amber-500' : 'bg-slate-300'
                            }`}>
                              <input
                                type="checkbox"
                                checked={getAdminInternalData(selectedIdea.id).ipAlert}
                                onChange={(e) => updateAdminInternalField('ipAlert', e.target.checked)}
                                className="sr-only"
                              />
                              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                                getAdminInternalData(selectedIdea.id).ipAlert ? 'translate-x-5' : 'translate-x-0.5'
                              }`} />
                            </span>
                          </label>
                          {getAdminInternalData(selectedIdea.id).ipAlert && (
                            <div>
                              <label className="block text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1.5">
                                {t('ipAlertComment')}
                              </label>
                              <textarea
                                rows={3}
                                value={getAdminInternalData(selectedIdea.id).ipAlertComment}
                                onChange={(e) => updateAdminInternalField('ipAlertComment', e.target.value)}
                                className="w-full px-4 py-3 border border-amber-200 rounded-xl text-xs leading-relaxed text-slate-700 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition bg-amber-50/40 resize-none"
                              />
                            </div>
                          )}
                        </section>
                      )}

                      {adminReviewStep === 'Chiffrage Ressources' && (
                        <section className="space-y-4 pt-5 first:pt-0">
                          <div>
                            <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                              {t('resourceSizing')}
                            </h5>
                            <p className="text-xs text-slate-400 mt-1">
                              {t('resourceSizingDescription')}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                {t('estimatedBudget')}
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={getAdminInternalData(selectedIdea.id).estimatedBudget}
                                onChange={(e) => updateAdminInternalField('estimatedBudget', e.target.value)}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-philips-blue/15"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                {t('resourcesFte')}
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={getAdminInternalData(selectedIdea.id).resourcesFte}
                                onChange={(e) => updateAdminInternalField('resourcesFte', e.target.value)}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-philips-blue/15"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              {t('resourceSizingComments')}
                            </label>
                            <textarea
                              rows={4}
                              value={getAdminInternalData(selectedIdea.id).resourceSizingComments}
                              onChange={(e) => updateAdminInternalField('resourceSizingComments', e.target.value)}
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-700 focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white resize-none"
                            />
                          </div>
                        </section>
                      )}

                      {adminReviewStep === 'Arbitrage Philips' && (
                        <section className="space-y-4 pt-5 first:pt-0">
                          <div>
                            <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                              {t('arbitration')}
                            </h5>
                            <p className="text-xs text-slate-400 mt-1">
                              {t('arbitrationDescription')}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                {t('roadmapFit')}
                              </label>
                              <select
                                value={getAdminInternalData(selectedIdea.id).roadmapFit}
                                onChange={(e) => updateAdminInternalField('roadmapFit', e.target.value)}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-philips-blue/15"
                              >
                                {ADMIN_ROADMAP_FITS.map(fit => (
                                  <option key={fit} value={fit}>{fit}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                {t('fundingSource')}
                              </label>
                              <select
                                value={getAdminInternalData(selectedIdea.id).fundingSource}
                                onChange={(e) => updateAdminInternalField('fundingSource', e.target.value)}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-philips-blue/15"
                              >
                                {ADMIN_FUNDING_SOURCES.map(source => (
                                  <option key={source} value={source}>{source}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              {t('arbitrationComments')}
                            </label>
                            <textarea
                              rows={4}
                              value={getAdminInternalData(selectedIdea.id).arbitrationComments}
                              onChange={(e) => updateAdminInternalField('arbitrationComments', e.target.value)}
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-700 focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white resize-none"
                            />
                          </div>
                        </section>
                      )}

                      {adminReviewStep === 'Approuvé' && (
                        <section className="space-y-2">
                          <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                            {t('finalizedCase')}
                          </h5>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {t('finalizedCaseBody')}
                          </p>
                        </section>
                      )}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm">
                    <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                      <div className="p-2 bg-sky-50 rounded-xl text-sky-700">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          {t('officialPiMessage')}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {t('officialPiMessageHelp')}
                        </p>
                      </div>
                    </div>
                    <textarea
                      rows={5}
                      placeholder={t('feedbackPlaceholder')}
                      value={editFeedback}
                      onChange={(e) => setEditFeedback(e.target.value)}
                      className="mt-4 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white resize-none text-slate-800"
                    />
                    <p className="mt-2 text-xs font-bold text-amber-700">
                      {t('officialPiWarning')}
                    </p>
                  </div>

                  {selectedIdea.attachments && selectedIdea.attachments.length > 0 && (
                    <div className="text-left bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('doctorAttachments')}</span>
                      <div className="space-y-1.5">
                        {selectedIdea.attachments.map((file, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={(e) => handleDownloadAttachment(e, file)}
                            className="w-full flex items-center justify-between text-xs text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 p-2.5 rounded-lg transition hover:border-slate-300 font-semibold cursor-pointer"
                          >
                            <span className="flex items-center gap-2 truncate max-w-[85%]">
                              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                              <span className="truncate">{file.name}</span>
                              <span className="text-[10px] text-slate-400 font-normal shrink-0">({file.size})</span>
                            </span>
                            <Download className="w-4 h-4 text-slate-500 shrink-0 hover:text-philips-blue" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-auto border-t border-slate-100 text-left sticky bottom-0 bg-white">
                    <button
                      type="button"
                      onClick={() => handleAdminDrawerSave(false)}
                      className="flex-1 bg-philips-blue hover:bg-philips-accent text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-philips-blue/15 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      {t('saveInternalData')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdminDrawerSave(true)}
                      disabled={getNextFunnelStatus(editStatus) === editStatus}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-slate-900/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {t('advanceFunnel')}
                    </button>
                  </div>
                </>
              ) : (
                <>
              
              {/* Doctor Profile Info */}
              <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-philips-blue/10 flex items-center justify-center text-philips-blue shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase tracking-wide">{t('submitterDoctor')}</span>
                  <span className="block text-sm font-black text-slate-800">{selectedIdea.piName}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3 text-slate-400 font-bold" />
                    {selectedIdea.piHospital}
                  </span>
                </div>
              </div>

              {/* Title Input (Editable) */}
              <div className="text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5 text-philips-blue" />
                  {t('ideaTitleEditable')}
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition duration-200 bg-white"
                />
              </div>

              {/* Categorization & Metadata selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                
                {/* Modality Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t('clinicalModality')}
                  </label>
                  <select
                    value={editModality}
                    onChange={(e) => setEditModality(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-700"
                  >
                    {MODALITIES.map(mod => (
                      <option key={mod} value={mod}>{modalityLabel(mod)}</option>
                    ))}
                  </select>
                </div>

                {role === 'orchestrator' && (
                  <>
                    {/* BU Selector (Orchestrator exclusive) */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Business Unit Philips
                      </label>
                      <select
                        value={editBusinessUnit}
                        onChange={(e) => setEditBusinessUnit(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-800 font-bold"
                      >
                        <option value="">{t('selectBU')}</option>
                        {BUSINESS_UNITS.map(bu => (
                          <option key={bu} value={bu}>{bu}</option>
                        ))}
                      </select>
                    </div>

                    {/* Status Selector */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {t('projectStatus')}
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-700"
                      >
                        {STATUSES.map(stat => (
                          <option key={stat} value={stat}>{statusLabel(stat)}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

              </div>

              {/* Editable Clinical Problem */}
              <div className="text-left">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5 text-philips-blue" />
                    {t('clinicalProblemEditable')}
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">{editProblem.length}/1500 {t('chars')}</span>
                </div>
                <textarea
                  maxLength={1500}
                  rows={6}
                  value={editProblem}
                  onChange={(e) => setEditProblem(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-700 focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white resize-none"
                />
              </div>

              {/* Editable Proposed Solution */}
              <div className="text-left">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5 text-philips-blue" />
                    {t('proposedSolutionEditable')}
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">{editSolution.length}/1500 {t('chars')}</span>
                </div>
                <textarea
                  maxLength={1500}
                  rows={6}
                  value={editSolution}
                  onChange={(e) => setEditSolution(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-700 focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white resize-none"
                />
              </div>

              {/* Attachments List with Download (Orchestrator Panel) */}
              {selectedIdea.attachments && selectedIdea.attachments.length > 0 && (
                <div className="text-left bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('doctorAttachments')}</span>
                  <div className="space-y-1.5">
                    {selectedIdea.attachments.map((file, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => handleDownloadAttachment(e, file)}
                        className="w-full flex items-center justify-between text-xs text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 p-2.5 rounded-lg transition hover:border-slate-300 font-semibold cursor-pointer"
                      >
                        <span className="flex items-center gap-2 truncate max-w-[85%]">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal shrink-0">({file.size})</span>
                        </span>
                        <Download className="w-4 h-4 text-slate-500 shrink-0 hover:text-philips-blue" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {role === 'orchestrator' && (
                <div className="text-left bg-blue-50/50 border border-blue-100 p-5 rounded-2xl">
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-900/70 mb-2">
                    {t('feedbackVisible')}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t('feedbackPlaceholder')}
                    value={editFeedback}
                    onChange={(e) => setEditFeedback(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 text-xs focus:outline-none focus:ring-2 focus:ring-philips-blue/20 focus:border-philips-blue transition bg-white resize-none text-slate-800"
                  />
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-4 mt-auto border-t border-slate-100 text-left">
                <button
                  type="submit"
                  className="flex-1 bg-philips-blue hover:bg-philips-accent text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-philips-blue/15 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  {role === 'orchestrator' ? t('update') : t('saveChanges')}
                </button>
                {role === 'pi' && selectedIdea.status !== 'Archivé' && (
                  <button
                    type="button"
                    onClick={() => requestArchiveIdea(selectedIdea)}
                    className="px-5 py-3 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-2"
                  >
                    <Archive className="w-4 h-4" />
                    {t('archive')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedIdea(null)}
                  className="px-5 py-3 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-bold transition cursor-pointer"
                >
                  {t('close')}
                </button>
              </div>

                </>
              )}
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
